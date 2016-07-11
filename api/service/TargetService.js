import CRUDService from './CRUDService'
import {autobind } from 'core-decorators';
import * as web from 'express-decorators';
import TargetZone from '../universal/model/TargetZone'
import knex from 'knex'

@autobind
@web.controller('/target')
export default class TargetService extends CRUDService {

  read(id) {
    return this.model.query()
      .findById(id)
      .eager('target_zone')
  }

  create(data) {

  }

  async update(id, data) {
    // update the parent
    let r = this.model.findById(id)
    if(!r) {
      //TODO: Throw an exception, that will be rendered as 404
    }

    // update the children, zones in this scenario
    this.updateItoN({
      model: TargetZone,
      dbRows: {},
      inputRows: {},
      fk: {
        targetId: id
      }
    })
  }


  async updateItoN({model, dbRows, inRows, fk}) {
    // if in input, not in db, then insert
    // if in input and in db, then update
    // if not in input and in db, then delete
    let keep = []
    for(let i = 0; i < inRows.length; i++) {
      const inRow = Object.assign({}, inRows[i], fk)
      if(dbRows.findIndex((dbRow, dbIdx) => dbRow.id == inRow.id)) {
        keep.push(dbRow.id)
        // update the record
        await model.updateById(dbRow.id, inRow)
      } else {
        // in input, not in db, create
        await model.insert(inRow)
      }
    }

    for(let i = 0; i < dbRows.length; i++) {
      const dbRow = dbRows[i]
      if(-1 === keep.indexOf(dbRow.id)) {
        // in db, not in input, delete
        await model.deleteById(dbRow.id)
      }
    }
  }


}