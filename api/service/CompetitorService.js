import CRUDService from './CRUDService'
import {autobind} from 'core-decorators';
import * as web from 'express-decorators';
import knex from 'knex'

@autobind
@web.controller('/competitor')
export default class CompetitorService extends CRUDService {

  filterRules() {
    return {
      searchText: (qb, {operator, value}) => {
        const v = value.trim()
        if(!v) return

        return qb.andWhere(function() {
          this.where('lastName', 'ilike', `%${v}%`).orWhere('firstName', 'ilike', `%${v}%`)
        })
      },
      belongsToMatch: (qb, {operator, value}) => {
        return qb.whereNotIn('id', function() {
          this.select('competitorId').from('match_competitor').where('matchId', '=', value)
        })
      }
    }
  }
}