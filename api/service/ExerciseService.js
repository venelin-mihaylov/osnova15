import CRUDService from './CRUDService'
import {autobind} from 'core-decorators'
import ItoN from '../utils/ItoN'


/**
 * on match exercise edit,
 * the service has to add/edit only a single match_exercise record,
 * for the current match.
 * on match exercise save, the service has to create/update
 * match_exercise_target_zone records, one for each target_zone
 * alternatively this data should be present in the form for live edit
 */
@autobind
export default class ExerciseService extends CRUDService {
  defaultOrderBy(qb) {
    return qb
      .orderBy('favourite', 'desc')
      .orderBy('name', 'asc')
  }

  filterRules() {
    return {
      searchText: (qb, {value}) => {
        const v = value.trim()
        if (!v) return qb

        return qb.andWhere(function () {
          this.where('name', 'ilike', `%${v}%`)
        })
      }
    }
  }

  read(id) {
    const eagerParam = {
      orderById: b => b.orderBy('id')
    }

    return this.model.query()
      .findById(id)
      .eager('[exercise_target(orderById), exercise_target.match_exercise_target_zone(orderById)]', eagerParam)
  }

  itonParams() {
    return ItoN.itonParams(this.model, [{
      relName: 'exercise_target'
    }])
  }

  async doCreate({record}) {
    // separate validation in case of ItoN, otherwise the validation errors are not properly rendered
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
    return await this.model.query()
      .findById(id)
      .eager(...ItoN.eagerRelation(this.itonParams()))
  }

  listQuery() {
    return this.model.query().eager(...ItoN.eagerRelation(this.itonParams()))
  }

  async createFavouriteExerciseForMatch({matchId, exerciseId}) {
    const exercise = await this.model.query()
      .findById(exerciseId)
      .eager('exercise_target')

    if (!exercise) {
      throw new Error('bad input')
    }

    const json = exercise.toJSON()
    delete json.id
    json.favourite = false
    json.matchId = matchId
    for (let i = 0; i < json.exercise_target.length; i++) {
      delete json.exercise_target[i].id
    }

    return await this.model.query()
      .insertWithRelated(json)
      .returning('*')
      .then(result => result.id)
  }
}
