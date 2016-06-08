var express = require('express');
var router = express.Router();
import TournamentService from '../service/TournamentService';

const service = new TournamentService();

router.get('/', function(req, res) {
  res.json(service.list(req));
});

export default router;