import {autobind} from 'core-decorators'
import QueryFilter from './QueryFilter'

@autobind
export default class CRUDService {

  model = null

  constructor(model) {
    this.model = model
  }

  filterRules() {
    return {}
  }

  sortRules() {
    return {}
  }

  defaultSort(qb) {
    return qb.orderBy('id', 'asc')
  }

  listQuery() {
    return this.model.query()
  }

  sort(qb, sortBy, sortDirection) {
    if (!sortBy) {
      return this.defaultSort(qb)
    }

    const sortRules = this.sortRules()
    if (sortRules[sortBy]) {
      return sortRules[sortBy](qb, sortBy, sortDirection)
    }

    return qb.sort(sortBy, sortDirection)
  }

  paginate(qb, page, limit) {
    const offset = limit * (page - 1)
    qb.offset(offset).limit(limit)
    return qb
  }

  async list({
    sortBy,
    sortDirection,
    page,
    limit,
    filter
  }) {
    let qb = this.listQuery()
    qb = QueryFilter.filter(qb, filter, this.filterRules())
    qb = this.sort(qb, sortBy, sortDirection)
    qb = this.paginate(qb, page, limit)
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
