import CRUDService from './CRUDService'
import {autobind} from 'core-decorators'
import ItoN from '../utils/ItoN'

@autobind
export default class ExerciseService extends CRUDService {

  ItoNRelation = 'exercise_target'

  async createFavouriteExerciseForMatch(input) {
    const exercise = await this.model.query().findById(input.exerciseId).eager('exercise_target')
    if (!exercise) {
      throw new Error('bad input')
    }

    const json = exercise.toJSON()
    delete json.id
    json.favourite = false
    for (let i = 0; i < json.exercise_target.length; i++) {
      delete json.exercise_target[i].id
    }
    json.match_exercise = [{
      matchId: input.matchId,
    }]

    return await this.model.query()
      .insertWithRelated(json)
      .returning('*')
      .then(result => result.id)
  }

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
      },
      belongsToMatch: (qb, {value, params}) => qb.andWhere(function () {
        this.whereNotIn('id', function () {
          this.select('exerciseId')
            .from('match_exercise')
            .where('matchId', '=', value)
        })
        if (params && params.curId) {
          this.orWhere('id', '=', params.curId)
        }
      }),
    }
  }

  read(id) {
    return this.model.query()
      .findById(id)
      .eager(...ItoN.eagerRelation(this.itonParams()))
  }

  itonParams() {
    const model = this.model
    const relSpec = [{
      relName: 'exercise_target'
    }]

    return {
      model,
      relSpec
    }
  }

  async create(input) {
    // separate validation step for ItoN, otherwise the validation errors are not properly rendered
    ItoN.validateMultiple({
      input,
      ...(this.itonParams())
    })
    return this.model.query().insertWithRelated(input)
  }

  listQuery() {
    return this.model.query().eager(...ItoN.eagerRelation(this.itonParams()))
  }

  async update(id, input) {
    await ItoN.updateParentAndRelations({
      id,
      input,
      ...(this.itonParams())
    })
    // return updated, the easy way
    return this.model.query().findById(id).eager(...ItoN.eagerRelation(this.itonParams()))
  }
}
