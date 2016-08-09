import CRUDService from './CRUDService'
import {autobind } from 'core-decorators';
import * as web from 'express-decorators';
import ItoN from '../utils/ItoN'
import NotFoundException from '../exception/NotFoundException'
import knex from 'knex'
import _forOwn from 'lodash.forown'


@autobind
@web.controller('/exercise')
export default class ExerciseService extends CRUDService {

  ItoNRelation = 'exercise_target'

  @web.post('/misc/createFavouriteExerciseForMatch')
  async webCreateFavouriteExerciseForMatch(req, res) {
    res.json(await this.createFavouriteExerciseForMatch(req.body))
  }

  async createFavouriteExerciseForMatch(input) {
    const exercise = await this.model.query().findById(input.exerciseId).eager('exercise_target')
    if(!exercise) {
      throw new Error("bad input")
    }

    let json = exercise.toJSON()
    delete json.id
    json.favourite = false
    for(var i = 0; i < json.exercise_target.length; i++) {
      delete json.exercise_target[i].id
    }
    json.match_exercise = [{
      matchId: input.matchId
    }]

    return await this.model.query().insertWithRelated(json).returning('*').then((result) => {
      return result.id
    })
  }


  filterRules() {
    return {
      searchText: (qb, {operator, value}) => {
        const v = value.trim()
        if(!v) return qb

        return qb.andWhere(function() {
          this.where('name', 'ilike', `%${v}%`)
        })
      },
      belongsToMatch: (qb, {operator, value, params}) => {
        return qb.andWhere(function() {
          this.whereNotIn('id', function() {
            this.select('exerciseId').from('match_exercise').where('matchId', '=', value)
          })
          if(params && params.curId) {
            this.orWhere('id', '=', params.curId)
          }
        })
      }
    }
  }

  read(id) {
    return ItoN.findByIdEagerRelation({id, ...(this.ItoNParams())})
  }

  ItoNParams() {
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