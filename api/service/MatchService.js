import CRUDService from './CRUDService'
import {autobind} from 'core-decorators'

@autobind
export default class MatchService extends CRUDService {

  read(id) {
    return this.model.query()
      .findById(id)
  }

  filterRules() {
    return {
      name: (qb, {operator, value}) => qb.andWhere('matches.name', CRUDService.toSqlOperator(operator), CRUDService.toSqlValue(operator, value))
    }
  }

  defaultOrderBy(qb) {
    return qb
      .orderBy('startDate', 'desc')
      .orderBy('id', 'asc')
  }

  listQuery() { // eslint-disable-line
    return this.model.query()
      .select('matches.*', 'tournament.name as tournamentId__name')
      .leftJoin('tournament', 'matches.tournamentId', 'tournament.id')
  }
}

