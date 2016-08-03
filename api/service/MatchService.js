import CRUDService from './CRUDService'
import {autobind, decorate } from 'core-decorators';
import {QueryBuilder} from 'knex'
import {logSql} from '../utils/utils'
import * as web from 'express-decorators';
import MatchCompetitor from '../../universal/model/MatchCompetitor'

@autobind
@web.controller('/match')
export default class MatchService extends CRUDService {

  @decorate(logSql)
  read(id) {
    return this.model.query()
      .findById(id)
  }

  @decorate(logSql)
  list({filter}) {
    return this.model.query()
      .select('matches.*', 'tournament.name as tournamentId__name')
      .join('tournament', 'matches.tournamentId', 'tournament.id')
  }

}

