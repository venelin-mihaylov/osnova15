import CRUDService from './CRUDService'
import {autobind} from 'core-decorators'
import ItoN from '../utils/ItoN'

@autobind
export default class TargetService extends CRUDService {

  ItoNRelation = 'target_zone'

  filterRules() {
    return {
      searchText: (qb, {value}) => {
        const v = value.trim()
        if (!v) return qb
        return qb.where('name', 'ilike', `%${v}%`)
      },
      matchId: (qb, {value}) => {
        qb.whereIn('id', b => b.select('exercise_target.targetId')
            .from('exercise_target')
            .innerJoin('exercise', 'exercise_target.exerciseId', '=', 'exercise.id')
            .where('exercise.matchId', '=', value)
        )
        return qb
      }
    }
  }

  itonParams() {
    const model = this.model
    const relName = this.ItoNRelation
    const relSpec = {relName}

    return {
      model,
      relSpec
    }
  }

  listQuery() {
    return this.model.query().eager(...ItoN.eagerRelation(this.itonParams()))
  }

  read(id) {
    return this.model.query()
      .findById(id)
      .eager(...ItoN.eagerRelation(this.itonParams()))
  }

  async doCreate({record}) {
    // separate validation step for ItoN, otherwise the validation errors are not properly rendered
    ItoN.validateMultiple({
      input: record,
      ...(this.itonParams())
    })
    return await this.model.query().insertWithRelated(record)
  }

  async doUpdate(id, {record}) {
    await ItoN.updateParentAndRelations({
      id,
      input: record,
      ...(this.itonParams())
    })
    // return updated, the easy way
    return await this.model.query().findById(id).eager(...ItoN.eagerRelation(this.itonParams()))
  }
}
