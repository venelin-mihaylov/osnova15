import {autobind} from 'core-decorators'
import QueryFilter from './QueryFilter'

@autobind
export default class CRUDService {

  model = null

  constructor(model) {
    this.model = model
  }

  filterRules() {
  }

  listQuery() {
    return this.model.query().orderBy('id')
  }

  async list({
    filter
  }) {
    let qb = this.listQuery()
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

}
