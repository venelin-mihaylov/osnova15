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
        qb.whereIn('id', function () {
          this.select('exercise_target.targetId')
            .from('exercise_target')
            .innerJoin('match_exercise', 'exercise_target.exerciseId', '=', 'match_exercise.exerciseId')
            .where('match_exercise.matchId', '=', value)
        })
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

  async doCreate(input) {
    // separate validation step for ItoN, otherwise the validation errors are not properly rendered
    ItoN.validateMultiple({
      input,
      ...(this.itonParams())
    })
    return await this.model.query().insertWithRelated(input)
  }

  async doUpdate(id, input) {
    await ItoN.updateParentAndRelations({
      id,
      input,
      ...(this.itonParams())
    })
    // return updated, the easy way
    return await this.model.query().findById(id).eager(...ItoN.eagerRelation(this.itonParams()))
  }
}