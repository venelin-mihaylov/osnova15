import CRUDService from './CRUDService'
import {autobind, decorate} from 'core-decorators'
import {logSql} from '../utils/utils'
import * as web from 'express-decorators'

@autobind
@web.controller('/match')
export default class MatchService extends CRUDService {

  @decorate(logSql)
  read(id) {
    return this.model.query()
      .findById(id)
  }

  @decorate(logSql)
  list() {
    return this.model.query()
      .select('matches.*', 'tournament.name as tournamentId__name')
      .join('tournament', 'matches.tournamentId', 'tournament.id')
  }

}

