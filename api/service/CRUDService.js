import {autobind} from "core-decorators"
import {throwOnError} from '../utils/utils'
import * as web from 'express-decorators';
import {logSql} from '../utils/utils'
import {decorate} from 'core-decorators'
import QueryFilter from './QueryFilter'

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

    const json = await this.read(req.params.id)
    if (!json) {
      res.status(404).json({globalError: 'Record not found'})
    } else {
      res.json(json)
    }
  }

  @web.put('/')
  async webCreate(req, res) {
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

  filterRules() {

  }

  listQuery() {
    return this.model.query()
  }

  async list({
    filter
  }) {
    let qb = this.listQuery().orderBy('id')
    qb = QueryFilter.filter(qb, filter, this.filterRules())
    // TODO: pagination
    return await qb
  }

  async create(data) {
    return this.model.query().insert(data)
  }

  async read(id) {
    return this.model.query().findById(id)
  }

  async update(id, data) {
    return this.model.query().updateAndFetchById(id, data)
  }

  async delete(id) {
    return this.model.query().deleteById(id)
  }

  static factory(model) {
    @web.controller(`/${model.tableName}`)
    class CRUDServiceBound extends CRUDService {}
    return new CRUDServiceBound(model)
  }

}
