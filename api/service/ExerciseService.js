import CRUDService from './CRUDService'
import {autobind} from 'core-decorators'
import ItoN from '../utils/ItoN'

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
      },
      matchId: (qb, {value, operator}) => qb.andWhere(function () {
        if (operator === '=') {
          this.whereIn('id', function () {
            this.select('exerciseId')
              .from('match_exercise')
              .where('matchId', '=', value)
          })
        }
        if (operator === '<>') {
          this.whereNotIn('id', function () {
            this.select('exerciseId')
              .from('match_exercise')
              .where('matchId', '=', value)
          })
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
    }, {
      relName: 'match_exercise'
    }]

    return {
      model,
      relSpec
    }
  }

  async doCreate(input) {
    // separate validation in case of ItoN, otherwise the validation errors are not properly rendered
    ItoN.validateMultiple({
      input,
      ...(this.itonParams())
    })
    return await this.model.query().insertWithRelated(input)
  }

  async afterCreate(input, response) {
    console.log('afterCreate')
    console.log(input)
    console.log(response)
  }

  async afterUpdate(id, input, response) {
    console.log('afterUpdate')
    console.log(input)
    console.log(response)
  }

  async doUpdate(id, input) {
    await ItoN.updateParentAndRelations({
      id,
      input,
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

}
