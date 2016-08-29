import CRUDService from './CRUDService'
import {autobind} from 'core-decorators'

@autobind
export default class MatchService extends CRUDService {

  read(id) {
    return this.model.query()
      .findById(id)
  }

  listQuery() { // eslint-disable-line
    return this.model.query()
      .select('matches.*', 'tournament.name as tournamentId__name')
      .leftJoin('tournament', 'matches.tournamentId', 'tournament.id')
      .orderBy('id')
  }
}

