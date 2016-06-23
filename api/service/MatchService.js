import CRUDService from './CRUDService'

export default class MatchService extends CRUDService {
  list() {
    return this.model.query()
      .select('matches.*', 'tournament.name as tournament_id__name')
      .join('tournament', 'matches.tournament_id', 'tournament.id')
  }
}

