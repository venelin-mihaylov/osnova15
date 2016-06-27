import * as web from 'express-decorators';
import {autobind} from 'core-decorators'
import {throwOnError} from '../utils/utils'


@web.controller('/match')
@autobind
export default class MatchController {

  /**
   *
   * @type {MatchService}
   */
  service = null;

  /**
   *
   * @param {MatchService} service
   */
  constructor(service) {
    this.service = service
  }

  @web.get('/')
  async list(req, res) {
    res.json(await this.service.list(req))
  }

  @web.get('/:id')
  async read(req, res) {
    req.checkParams('id').isInt()
    throwOnError(req.validationErrors())

    res.json(await this.service.read(req.params.id))
  }

  @web.put('/')
  async create(req, res) {
    res.json(await this.service.list(req))
  }

  @web.post('/:id')
  async update(req, res) {
    req.checkParams('id').isInt()
    throwOnError(req.validationErrors())

    res.json(await this.service.update(id, req.body.data))
  }

  @web.delete('/:id')
  async delete(req, res) {
    req.checkParams('id').isInt()
    throwOnError(req.validationErrors())

    res.json(await this.service.delete(id, req.body.data))
  }

}