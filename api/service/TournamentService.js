import CRUDService from './CRUDService'
import {autobind } from 'core-decorators';
import * as web from 'express-decorators';
import knex from 'knex'

@autobind
@web.controller('/tournament')
export default class TournamentService extends CRUDService {

  filterRules() {
    return {
      searchText: {
        fn: (qb, {value}) => {
          const v = value.trim()
          if(!v) return
          return qb.where('name', 'ilike', `%${v}%`)
        }
      }
    }
  }
}