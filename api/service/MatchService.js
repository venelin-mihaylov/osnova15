import CRUDService from './CRUDService'
import {autobind, decorate } from 'core-decorators';
import {QueryBuilder} from 'knex'
import {logSql} from '../utils/utils'
import * as web from 'express-decorators';
import {throwOnError} from '../utils/utils'
import Competitor from '../../universal/model/Competitor'
import CompetitorMatch from '../../universal/model/CompetitorMatch'

@autobind
@web.controller('/match')
export default class MatchService extends CRUDService {

  @web.get('/')
  async webList(req, res) {
    res.json(await this.list(req))
  }

  @web.get('/:id')
  async webRead(req, res) {
    req.checkParams('id').isInt()
    throwOnError(req.validationErrors())

    res.json(await this.read(req.params.id))
  }

  @web.put('/')
  async webCreate(req, res) {
    res.json(await this.list(req))
  }

  @web.post('/:id')
  async webUpdate(req, res) {
    req.checkParams('id').isInt()
    throwOnError(req.validationErrors())

    res.json(await this.update(req.params.id, req.body.data))
  }

  @web.delete('/:id')
  async webDelete(req, res) {
    req.checkParams('id').isInt()
    throwOnError(req.validationErrors())

    res.json(await this.delete(req.params.id, req.body.data))
  }

  @web.get('/:id/competitor')
  async webListCompetitor(req, res) {
    req.checkParams('id').isInt()
    throwOnError(req.validationErrors())

    res.json(await this.listCompetitor(req.params.id))
  }

  @web.post('/:id/competitor')
  async webUpdateAllCompetitors(req, res) {
    req.checkParams('id').isInt()
    throwOnError(req.validationErrors())

    res.json(await this.updateAllCompetitors(req.params.id, req.body.data))
  }

  @decorate(logSql)
  read(id) {
    return this.model.query().findById(id)
      .eager('competitor_match.competitor')
  }

  addCompetitor(id, data) {
    this.model.findById(id).then(r => {
      r.$relatedQuery('competitor_match').insert(data)
    }).then(() => {
      return "test"
    })
  }

  @decorate(logSql)
  listCompetitor(id) {
    return CompetitorMatch.query()
      .where('matchId', '=', id)
      .eager('competitor')
  }

  /**
   * update all competitors for the match
   * @param id
   * @param data
   */
  updateAllCompetitors(id, data) {

  }

  /**
   * Update a single competitor
   * @param id
   * @param competitorId
   * @param data
   */
  updateSingleCompetitor(id, competitorId, data) {

  }

  deleteCompetitor(id, competitorId) {

  }

  @decorate(logSql)
  list() {
    return this.model.query()
      .select('matches.*', 'tournament.name as tournamentId__name')
      .join('tournament', 'matches.tournamentId', 'tournament.id')
  }
}

