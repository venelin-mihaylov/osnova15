import CRUDService from './CRUDService'
import {autobind, decorate } from 'core-decorators';
import {QueryBuilder} from 'knex'
import * as web from 'express-decorators';
import {throwOnError} from '../utils/utils'
import MatchCompetitor from '../../universal/model/MatchCompetitor'

@autobind
@web.controller('/match_competitor')
export default class MatchCompetitorService extends CRUDService {

  read(id) {
    return this.model.query()
      .findById(id)
      .eager('competitor')
  }

  list({filter}) {
    let qb = this.model.query().eager('competitor')
    return this.filter(qb, filter)
  }
}

