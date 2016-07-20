import CRUDService from './CRUDService'
import {autobind } from 'core-decorators';
import * as web from 'express-decorators';
import ItoN from '../utils/ItoN'
import NotFoundException from '../exception/NotFoundException'
import knex from 'knex'


@autobind
@web.controller('/exercise')
export default class ExerciseService extends CRUDService {

  ItoNRelation = 'exercise_target'

  filterRules() {
    return {
      searchText: {
        fn: (qb, {operator, value}) => {
          const v = value.trim()
          if(!v) return

          return qb.andWhere(function() {
            this.where('name', 'ilike', `%${v}%`)
          })
        }
      },
      belongsToMatch: {
        fn: (qb, {operator, value, params: {curId}}) => {
          return qb.andWhere(function() {
            qb.whereNotIn('id', function () {
              this.select('exerciseId').from('match_exercise').where('matchId', '=', value)
            })
            if (curId) {
              qb.orWhere('id', '=', curId)
            }
          })
        }
      }
    }
  }

  read(id) {
    return ItoN.findByIdEagerRelation({id, ...(this.ItoNParams())})
  }

  ItoNParams() {
    const model = this.model
    const relName =  this.ItoNRelation
    const relSpec = {relName}

    return {
      model,
      relSpec
    }
  }

  async create(input) {
    // separate validation step for ItoN, otherwise the validation errors are not properly rendered
    ItoN.validateMultiple({
      input,
      ...(this.ItoNParams())
    })
    return this.model.query().insertWithRelated(input)
  }

  async update(id, input) {
    await ItoN.updateParentAndRelations({
      id,
      input,
      ...(this.ItoNParams())
    })
    // return updated, the easy way
    return ItoN.findByIdEagerRelation({id, ...(this.ItoNParams())})
  }


}