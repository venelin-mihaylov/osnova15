import CRUDService from './CRUDService'
import {autobind} from 'core-decorators';
import * as web from 'express-decorators';
import TargetZone from '../../universal/model/TargetZone'
import {toArray} from '../utils/utils'
import knex from 'knex'
import ItoN from '../utils/ItoN'

@autobind
@web.controller('/target')
export default class TargetService extends CRUDService {

  ItoNRelation = 'target_zone'

  read(id) {
    return ItoN.findByIdEagerRelation({id, model: this.model, relation: 'target_zone'})
  }

  async create(input) {
    // separate validation step for ItoN, otherwise the validation errors are not properly formatted
    ItoN.validateMultiple({
      model: this.model,
      relation: this.ItoNRelation,
      input
    })
    return this.model.query().insertWithRelated(input)
  }

  async update(id, input) {
    // update the parent

    const r = await this.model.query().updateAndFetchById(id, input)
    if (!r) {
      //TODO: Throw an exception, that will be rendered as 404
    }

    const relation =  this.ItoNRelation
    const params = ItoN.paramsByModel({
      id,
      model: this.model,
      relation
    })
    await ItoN.updateMultiple({input, params})
    // return updated, the easy way
    return ItoN.findByIdEagerRelation({id, model: this.model, relation})
  }

}