import CRUDService from './CRUDService'
import {autobind } from 'core-decorators';
import * as web from 'express-decorators';
import knex from 'knex'

@autobind
@web.controller('/exercise')
export default class ExerciseService extends CRUDService {

  filterRules() {
    return {
      searchText: {
        fn: (qb, {operator, value}) => {
          const v = value.trim()
          if(!v) return

          return qb.andWhere(function() {
            this.where('name', 'ilike', `%${v}%`)
          })
        }
      },
      belongsToMatch: {
        fn: (qb, {operator, value, params: {curId}}) => {
          return qb.andWhere(function() {
            qb.whereNotIn('id', function () {
              this.select('exerciseId').from('match_exercise').where('matchId', '=', value)
            })
            if (curId) {
              qb.orWhere('id', '=', curId)
            }
          })
        }
      }
    }
  }
}