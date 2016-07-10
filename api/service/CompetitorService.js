import CRUDService from './CRUDService'
import {autobind } from 'core-decorators';
import * as web from 'express-decorators';
import knex from 'knex'

@autobind
@web.controller('/competitor')
export default class CompetitorService extends CRUDService {

  filterRules() {
    return {
      searchText: {
        fn: (qb, {operator, value}) => {
          return qb.andWhere(function() {
            this.where('lastName', 'ilike', `%${value}%`).orWhere('firstName', 'ilike', `%${value}%`)
          })
        }
      },
      belongsToMatch: {
        fn: (qb, {operator, value}) => {
          return qb.whereNotIn('id', function() {
            this.select('competitorId').from('match_competitor').where('matchId', '=', value)
          })
        }
      }
    }
  }
}