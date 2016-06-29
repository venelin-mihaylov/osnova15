"use strict"
import {autobind} from "core-decorators"
import {ValidationError} from 'objection'
import {throwOnError} from '../utils/utils'
import * as web from 'express-decorators';

@autobind
export default class CRUDService {

  model = null

  constructor(model) {
    this.model = model
  }

  @web.get('/')
  async webList(req, res) {
    console.log(req.query)
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

  list(params) {
    const filter = JSON.parse(params.filter) || {}
    let qb = this.model.query()
    for(let field in filter) {
      if(!filter.hasOwnProperty(field)) continue
      qb.andWhere(field, '=', filter[field])
    }
    return qb
  }

  create(data) {
    return this.model.query().insertWithRelated(data)
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

  static CRUDServiceFactory(model) {
    @web.controller('/' + model.tableName)
    class CRUDServiceBound extends CRUDService {}
    return new CRUDServiceBound(model)
  }

}
