import CRUDService from './CRUDService';

export default class MatchService extends CRUDService {
  list() {
    return this.model.query()
      .select('Match.*, Tournament.name as tournament_id__name')
      .leftJoin('Tournament', 'Match.tournament_id', 'Tournament.id')
  }
}

