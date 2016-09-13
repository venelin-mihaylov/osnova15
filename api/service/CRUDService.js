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

  orderByRules() {
    return {}
  }

  defaultOrderBy(qb) {
    return qb.orderBy('id', 'asc')
  }

  listQuery(variation) { // eslint-disable-line
    return this.model.query()
  }

  orderBy(qb, orderBy, orderDirection) {
    if (!orderBy) {
      return this.defaultOrderBy(qb)
    }

    const rules = this.orderByRules()
    if (rules[orderBy]) {
      return rules[orderBy](qb, orderBy, orderDirection)
    }

    return qb.orderBy(orderBy, orderDirection)
  }

  paginate(qb, page, limit) {
    const offset = limit * (page - 1)
    qb.offset(offset).limit(limit)
    return qb
  }

  async list({
    variation,
    orderBy,
    orderDirection,
    page,
    limit,
    filter
  }) {
    let qb = this.listQuery(variation)
    qb = QueryFilter.filter(qb, filter, this.filterRules())
    qb = this.orderBy(qb, orderBy, orderDirection)
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
