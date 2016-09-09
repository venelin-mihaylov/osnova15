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

  sortRules() {

  }

  listQuery() {
    return this.model.query()
  }

  calcOrderBy(sortBy, sortDirection) {
    if(!sortBy) {
      return ['id', 'asc'] // base default
    }
    return [sortBy, sortDirection]
  }

  async list({
    sortBy,
    sortDirection,
    page,
    limit,
    filter
  }) {
    const offset = limit * (page - 1)
    let qb = this.listQuery()
    qb = QueryFilter.filter(qb, filter, this.filterRules())
    qb
      .orderBy(...this.calcOrderBy(sortBy, sortDirection))
      .offset(offset)
      .limit(limit)
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
