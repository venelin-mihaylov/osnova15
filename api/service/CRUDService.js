"use strict"
import {autobind} from "core-decorators"
import {throwOnError} from '../utils/utils'
import * as web from 'express-decorators';
import {logSql} from '../utils/utils'
import {decorate} from 'core-decorators'

@autobind
export default class CRUDService {

  model = null

  constructor(model) {
    this.model = model
  }

  @web.get('/')
  async webList(req, res) {
    res.json(await this.list(req.query))
  }

  @web.get('/:id')
  async webRead(req, res) {
    req.checkParams('id').isInt()
    throwOnError(req.validationErrors())

    res.json(await this.read(req.params.id))
  }

  @web.put('/')
  async webCreate(req, res) {
    console.log(req.body)
    res.json(await this.create(req.body))
  }

  @web.post('/:id')
  async webUpdate(req, res) {
    req.checkParams('id').isInt()
    throwOnError(req.validationErrors())

    res.json(await this.update(req.params.id, req.body))
  }

  @web.delete('/:id')
  async webDelete(req, res) {
    req.checkParams('id').isInt()
    throwOnError(req.validationErrors())

    res.json(await this.delete(req.params.id, req.body))
  }

  /**
   *
   * @param {QueryBuilder} qb
   * @param {object|string} filter
   */
  filter(qb, filter) {
    if(!filter) return qb

    if(typeof filter === 'string')
      filter = JSON.parse(filter)

    for(let field in filter) {
      if(!filter.hasOwnProperty(field)) continue
      qb.andWhere(field, '=', filter[field])
    }
    return qb
  }

  list({
    filter
  }) {
    return this.filter(this.model.query(), filter)
  }

  @decorate(logSql)
  create(data) {
    return this.model.query().insert(data)
  }

  read(id) {
    return this.model.query().findById(id)
  }

  update(id, data) {
    return this.model.query().updateAndFetchById(id, data)
  }

  delete(id) {
    return this.model.query().deleteById(id)
  }

  static factory(model) {
    @web.controller('/' + model.tableName)
    class CRUDServiceBound extends CRUDService {}
    return new CRUDServiceBound(model)
  }

}
