import TournamentModel from "../../universal/model/TournamentModel";

export default class TournamentService {

  dbTable = 'tournament';
  model = null;

  constructor() {
    this.model = TournamentModel;
  }

  list() {
    return "Hello world";
  }

  create(data) {
    return Tournament.query().insert(data);
  }

  read(req, res, next) {

  }

  update(req, res, next) {

  }

  delete(req, res, next) {

  }

}
