import CRUDService from './CRUDService'
import {autobind } from 'core-decorators';
import * as web from 'express-decorators';

@autobind
@web.controller('/match_exercise')
export default class MatchExerciseService extends CRUDService {

  read(id) {
    return this.model.query()
      .findById(id)
  }

  listQuery() {
    return this.model.query().eager('exercise')
  }
}