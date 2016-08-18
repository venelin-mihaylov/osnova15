import * as web from 'express-decorators'
import {throwOnError} from '../utils/utils'
import snakeCase from 'lodash/snakeCase'

export default class CRUDRest {
  /**
   * @type {CRUDService}
   */
  service = null
  middleware = null

  constructor(service, middleware) {
    this.service = service
    this.middleware = middleware
  }

  @web.use
  async webMiddleware(req, res, next) {
    console.log('webMiddleware')
    console.log(this.middleware)
    if (this.middleware) {
      this.middleware(req, res, next)
    } else {
      next()
    }
  }

  @web.get('/')
  async webList(req, res) {
    res.json(await this.service.list(req.query))
  }

  @web.get('/:id')
  async webRead(req, res) {
    req.checkParams('id').isInt()
    throwOnError(req.validationErrors())

    const json = await this.service.read(req.params.id)
    if (!json) {
      res.status(404).json({globalError: 'Record not found'})
    } else {
      res.json(json)
    }
  }

  @web.put('/')
  async webCreate(req, res) {
    res.json(await this.service.create(req.body))
  }

  @web.post('/:id')
  async webUpdate(req, res) {
    req.checkParams('id').isInt()
    throwOnError(req.validationErrors())

    res.json(await this.service.update(req.params.id, req.body))
  }

  @web.delete('/:id')
  async webDelete(req, res) {
    req.checkParams('id').isInt()
    throwOnError(req.validationErrors())

    res.json(await this.service.delete(req.params.id, req.body))
  }

  /**
   *
   * @param {CRUDService} service
   * @param options {object}
   * @param options.endpoint {string}
   * @param options.middleware {function}
   * @returns {CRUDRest}
   */
  static factory(service, options = {}) {
    const endpoint = options.endpoint || `/${snakeCase(service.model.tableName)}`
    @web.controller(endpoint)
    class CRUDRestBound extends CRUDRest {}
    return new CRUDRestBound(service, options.middleware)
  }
}
