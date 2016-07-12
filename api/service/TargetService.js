import CRUDService from './CRUDService'
import {autobind} from 'core-decorators';
import * as web from 'express-decorators';
import TargetZone from '../../universal/model/TargetZone'
import _isEqual from 'lodash.isequal'

import knex from 'knex'

@autobind
@web.controller('/target')
export default class TargetService extends CRUDService {

  orderById = builder => builder.orderBy('id')

  read(id) {
    const orderById = this.orderById
    return this.model.query()
      .findById(id)
      .eager('target_zone(orderById)', {orderById})
  }

  create(data) {
    return this.model.query().insertWithRelated(data)
  }

  async update(id, data) {
    // update the parent

    const {
      target_zone,
      ...target
    } = data

    await this.model.query().updateAndFetchById(id, target)


    const orderById = this.orderById
    let r = await this.model.query().findById(id).eager('target_zone(orderById)', {orderById})
    if (!r) {
      //TODO: Throw an exception, that will be rendered as 404
    }

    // update the children, zones in this scenario
    await this.updateItoN({
      model: TargetZone,
      relation: 'target_zone',
      dbRows: r.target_zone,
      inRows: target_zone,
      fk: {
        targetId: id
      }
    })

    // return updated, easy way
    return await this.model.query().findById(id).eager('target_zone(orderById)', {orderById})
  }


  async updateItoN({model, relation, dbRows, inRows, fk}) {

    // in input, not in db -> insert
    // in input, in db -> update
    // not in input, in db -> delete
    var keep = []
    for (let i = 0; i < inRows.length; i++) {
      const inRow = Object.assign({}, inRows[i], fk)
      const dbRow = dbRows.find(dbRow => dbRow.id == inRow.id)
      if (dbRow) {
        // in input, in db -> update
        keep.push(dbRow.id)
        if (!_isEqual(dbRow.toJSON(), inRow)) {
          try {
            console.log('update')
            await model.query().updateAndFetchById(dbRow.id, inRow)
          } catch(err) {
            if(err instanceof ValidationError) {
              let data = {}
              data[`relation[${i}]`] = err.data
              throw new ValidationError(data)
            }
          }
        }
      } else {
        // in input, not in db -> create
        try {
          console.log('insert')
          await model.query().insert(inRow)
        } catch(err) {
          if(err instanceof ValidationError) {
            let data = {}
            data[`relation[${i}]`] = err.data
            throw new ValidationError(data)
          }
        }
      }
    }

    for (let i = 0; i < dbRows.length; i++) {
      const dbRow = dbRows[i]
      if (-1 === keep.indexOf(dbRow.id)) {
        // in db, not in input -> delete
        await model.query().deleteById(dbRow.id).execute()
      }
    }
  }


}