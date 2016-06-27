import CRUDService from './CRUDService'
import * as web from 'express-decorators';

@web.controller('/match')
export default class MatchService extends CRUDService {
  read(id) {
    return this.model.query()
      .select('matches.*')
      .leftJoin('competitor_match', 'matches.id', 'competitor_match.matchId')
      .where('matches.id', '=', id)
  }

  competitor_add(id, data) {

  }

  competitor_list(id) {

  }

  /**
   * update all competitors for the match
   * @param id
   * @param data
   */
  competitor_update_all(id, data) {

  }

  /**
   * Update a single competitor
   * @param id
   * @param competitorId
   * @param data
   */
  competitor_update(id, competitorId, data) {

  }

  competitor_delete(id, competitorId) {

  }

  list() {
    return this.model.query()
      .select('mathes.*', 'tournament.name as tournamentId__name')
      .join('tournament', 'matches.tournamentId', 'tournament.id')
  }
}

