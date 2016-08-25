require('dotenv').config({silent: true});
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import bodyParser from 'body-parser'
import http from 'http'
import SocketIo from 'socket.io'
import morgan from 'morgan'

import config from '../universal/config'
import pg from 'pg'

import {Model} from 'objection'

import mountRestApi from './rest/mountRestApi'

import configureAuthRouter from './auth/configureAuthRouter'
import configurePassport from './config/passport/configurePassport'

import expressValidator from 'express-validator'
import {renderError} from './utils/utils'
import authMiddleware from './config/passport/authMiddleware'
import configurePgSession from 'connect-pg-simple'
import Knex from 'knex'

const pgSession = configurePgSession(session)

// Give the connection to objection.
const knex = Knex({ // eslint-disable-line new-cap
  client: 'pg',
  connection: process.env.DATABASE_URL
})
Model.knex(knex)

const app = express()
const server = new http.Server(app)

// <editor-fold desc="Express">
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))
app.use(expressValidator())
app.use(session({
  store: new pgSession({ // eslint-disable-line new-cap
    pg,                                       // Use global pg-module
    conString: process.env.DATABASE_URL, // Connect using something else than default DATABASE_URL env variable
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  name: 'sessionId',
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    rolling: true
  }
}))
// </editor-fold>

// <editor-fold desc="Passport.js">
configurePassport(passport)
app.use(passport.initialize())
app.use(passport.session())
// </editor-fold>

// <editor-fold desc="API endpoint">
app.use('/auth', configureAuthRouter(passport))

mountRestApi(app, {
  authMiddleware
})

// </editor-fold>
app.use(renderError)

// <editor-fold desc="Bind to port">
if (!config.apiPort) {
  console.error('==>     ERROR: No PORT environment variable has been specified')
  process.exit()
}

const runnable = app.listen(config.apiPort, (err) => {
  if (err) {
    console.error(err)
  }
  console.info('----\n==> 🌎  API is running on port %s', config.apiPort)
  console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort)
})
// </editor-fold>

// <editor-fold desc="Socket.IO">
const io = new SocketIo(server)
const bufferSize = 100
const messageBuffer = new Array(bufferSize)
let messageIndex = 0
io.path('/ws')
io.on('connection', (socket) => {
  socket.emit('news', {msg: `'Hello World!' from server`})

  socket.on('history', () => {
    for (let index = 0; index < bufferSize; index++) {
      const msgNo = (messageIndex + index) % bufferSize
      const msg = messageBuffer[msgNo]
      if (msg) {
        socket.emit('msg', msg)
      }
    }
  })

  socket.on('msg', (data) => {
    data.id = messageIndex
    messageBuffer[messageIndex % bufferSize] = data
    messageIndex++
    io.emit('msg', data)
  })
})
io.listen(runnable)
// </editor-fold>
