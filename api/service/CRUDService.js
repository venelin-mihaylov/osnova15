"use strict"
import {autobind} from "core-decorators"
import {ValidationError} from 'objection'

@autobind
export default class CRUDService {

  model = null

  constructor(model) {
    this.model = model
  }

  list() {
    return this.model.query()
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

}
