import TournamentModel from "../../universal/model/TournamentModel";
import {autobind} from "core-decorators";


@autobind
export default class TournamentService {

  model = null;

  constructor() {
    this.model = TournamentModel;
  }

  list() {
    return this.model.query();
  }

  create(data) {
    return this.model.query().insert(data);
  }

  read(req, res, next) {

  }

  update(req, res, next) {

  }

  delete(req, res, next) {

  }

}
