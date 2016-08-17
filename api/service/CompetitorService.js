import CRUDService from './CRUDService'
import {autobind} from 'core-decorators';
import * as web from 'express-decorators';

@autobind
@web.controller('/competitor')
export default class CompetitorService extends CRUDService {
  filterRules() {
    return {
      searchText: (qb, {value}) => {
        const v = value.trim()
        if (!v) return qb

        return qb.andWhere(function() {
          this.where('lastName', 'ilike', `%${v}%`).orWhere('firstName', 'ilike', `%${v}%`)
        })
      },
      belongsToMatch: (qb, {value}) => qb.whereNotIn('id', function() {
        this.select('competitorId')
          .from('match_competitor')
          .where('matchId', '=', value)
      }),
    }
  }
}
