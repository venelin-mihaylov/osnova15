import express from 'express';
import expressPromise from 'express-promise';
import session from 'express-session';
import bodyParser from 'body-parser';
import http from 'http';
import SocketIo from 'socket.io';
import config from '../universal/config';
import CRUDRouter from './router/CRUDRouter';
import CRUDService from './service/CRUDService';
import {Model} from 'objection';
import Knex from 'knex';
import TournamentModel from "../universal/model/TournamentModel";

const app = express();

const server = new http.Server(app);

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000}
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(expressPromise());

// Initialize knex connection.
var knex = Knex({client: 'pg', connection: {
  host: 'localhost',
  user: 'tcs',
  password: 'tcs',
  database: 'tcs'
}});

// Give the connection to objection.
Model.knex(knex);

app.use('/hello', function (req, res) {
  res.send("Hello world");
});

app.use("/tournament", CRUDRouter(new CRUDService(TournamentModel)));

if (!config.apiPort) {
  console.error('==>     ERROR: No PORT environment variable has been specified');
  process.exit();
}

const runnable = app.listen(config.apiPort, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
  console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
});

const io = new SocketIo(server);
const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;
io.path('/ws');
io.on('connection', (socket) => {
  socket.emit('news', {msg: `'Hello World!' from server`});

  socket.on('history', () => {
    for (let index = 0; index < bufferSize; index++) {
      const msgNo = (messageIndex + index) % bufferSize;
      const msg = messageBuffer[msgNo];
      if (msg) {
        socket.emit('msg', msg);
      }
    }
  });

  socket.on('msg', (data) => {
    data.id = messageIndex;
    messageBuffer[messageIndex % bufferSize] = data;
    messageIndex++;
    io.emit('msg', data);
  });
});
io.listen(runnable);
