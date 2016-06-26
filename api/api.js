import express from 'express'
import session from 'express-session'
import passport from 'passport'
import bodyParser from 'body-parser'
import http from 'http'
import SocketIo from 'socket.io'
import config from '../universal/config'
import CRUDService from './service/CRUDService'
import MatchService from './service/MatchService'
import {Model} from 'objection'
import Tournament from "../universal/model/Tournament"
import Match from "../universal/model/Match"
import Competitor from "../universal/model/Competitor"
import configureAuthRouter from './router/configureAuthRouter'
import configureCRUDRouter from './router/configureCRUDRouter'
import configurePassport from './config/passport/configurePassport'
import knex from './config/knex'
import expressValidator from 'express-validator'

// Give the connection to objection.
Model.knex(knex)

const app = express()
const server = new http.Server(app)

//<editor-fold desc="Express">
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))
app.use(expressValidator())
app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  name: 'sessionId',
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 60000
  }
}))
//</editor-fold>

//<editor-fold desc="Passport.js">
configurePassport(passport)
app.use(passport.initialize())
app.use(passport.session())
//</editor-fold>

//<editor-fold desc="API endpoint">
app.use('/auth', configureAuthRouter(passport))
app.use('/tournament', configureCRUDRouter(new CRUDService(Tournament)))
app.use('/match', configureCRUDRouter(new MatchService(Match)))
app.use('/competitor', configureCRUDRouter(new CRUDService(Competitor)))
//</editor-fold>


//<editor-fold desc="Bind to port">
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
//</editor-fold>

//<editor-fold desc="Socket.IO">
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
//</editor-fold>
