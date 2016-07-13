import CRUDService from './CRUDService'
import {autobind} from 'core-decorators';
import * as web from 'express-decorators';
import TargetZone from '../../universal/model/TargetZone'
import {toArray} from '../utils/utils'
import knex from 'knex'
import ItoN from '../utils/ItoN'
import NotFoundException from '../exception/NotFoundException'

@autobind
@web.controller('/target')
export default class TargetService extends CRUDService {

  ItoNRelation = 'target_zone'

  read(id) {
    return ItoN.findByIdEagerRelation({id, model: this.model, relName: 'target_zone'})
  }

  async create(input) {
    // separate validation step for ItoN, otherwise the validation errors are not properly formatted
    ItoN.validateMultiple({
      model: this.model,
      relSpec: {
        relName: this.ItoNRelation
      },
      input
    })
    return this.model.query().insertWithRelated(input)
  }

  async update(id, input) {
    // update the parent

    const {
      target_zone,
      ...target,
    } = input

    const r = await this.model.query().updateAndFetchById(id, target)
    if (!r) {
      throw new NotFoundException(this.model.tableName, id)
    }

    const relName =  this.ItoNRelation
    await ItoN.updateMultiple({
      id,
      input,
      model: this.model,
      relSpec: {relName}
    })
    // return updated, the easy way
    return ItoN.findByIdEagerRelation({id, model: this.model, relName})
  }

}