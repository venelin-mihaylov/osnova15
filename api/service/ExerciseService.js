import CRUDService from './CRUDService'
import {autobind} from 'core-decorators'
import ItoN from '../utils/ItoN'
import ExerciseTargetZone from '../../universal/model/ExerciseTargetZone'
import {targetZoneScore} from '../../universal/scoring/scoring'
import isInt from 'validator/lib/isInt'

/**
 * on match exercise edit,
 * the service has to add/edit only a single match_exercise record,
 * for the current match.
 * on match exercise save, the service has to create/update
 * exercise_target_zone records, one for each target_zone
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
      .eager('[exercise_target(orderById)]', eagerParam)
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

  static queryInsertIntoExerciseTargetZone(exerciseId) {
    return `insert into exercise_target_zone
    ( 
    "exerciseTargetId", 
    "targetId", 
    "zoneId", 
    "targetName", 
    "zoneName",  
    "height", 
    "width", 
    "distance"
    )
    select 
      exercise_target."id", 
      exercise_target."targetId", 
      target_zone."id",
      target.name, 
      target_zone.name,
      target_zone.height,
      target_zone.width,
      exercise_target.distance
    from exercise
    inner join exercise_target on exercise.id = exercise_target."exerciseId"
    inner join target on exercise_target."targetId" = target.id
    inner join target_zone on exercise_target."targetId" = target_zone."targetId"
    where exercise.id = ${exerciseId};`
  }

  static queryDeleteExistingExerciseTargetZone(exerciseId) {
    return `delete from exercise_target_zone where "exerciseTargetId" IN (SELECT et.id from exercise_target et where et."exerciseId" = ${exerciseId})`
  }

  static querySelectExerciseTargets(exerciseId) {
    return ExerciseTargetZone.query()
      .whereIn('exerciseTargetId', b => b.select('id')
        .from('exercise_target')
        .where('exerciseId', '=', exerciseId))
  }

  static queryUpdateExerciseTargetZoneScore(records) {
    if (!records) {
      return new Promise(() => {}, () => {})
    }
    return Promise.all(records.map(r => ExerciseTargetZone.query()
      .patchAndFetchById(r.id, {
        score: targetZoneScore(r.distance, r.height, r.weight)
      })))
  }


  async createExerciseTargetZone({id: exerciseId}) {
    if (!exerciseId) {
      return new Promise(() => {}, () => {})
    }

    return await this.model.raw(ExerciseService.queryDeleteExistingExerciseTargetZone(exerciseId))
      .then(this.model.raw(ExerciseService.queryInsertIntoExerciseTargetZone(exerciseId)))
      .then(ExerciseService.querySelectExerciseTargets(exerciseId))
      .then(ExerciseService.queryUpdateExerciseTargetZoneScore)
  }

  async doUpdate(id, {record}) {
    return await ItoN.updateParentAndRelations({
      id,
      input: record,
      ...(this.itonParams())
    }).then(this.model.query()
      .findById(id)
      .eager(...ItoN.eagerRelation(this.itonParams())))
  }

  async afterUpdate(id, input, response) {
    return await this.createExerciseTargetZone({id})
  }

  async afterCreate(input, response) {
    return await this.createExerciseTargetZone(response)
  }

  /**
   * exercise
   *   -> exercise_target - distance, maxPoints
   *     -> exercise_target_zone - targetName, zoneName, distance,
   *
   * @returns {*|QueryBuilder}
   */
  listQuery() {
    return this.model.query().eager('[exercise_target(orderById), exercise_target.[target(orderById), exercise_target_zone(orderById)]]', {
      orderById: b => b.orderBy('id')
    })
  }

  async createFavouriteExerciseForMatch({matchId, exerciseId}) {
    this.model.skipValidation = true

    const exercise = await this.model.query()
      .findById(exerciseId)
      .eager('exercise_target(orderById).exercise_target_zone(orderById)', {
        orderById: b => b.orderBy('id')
      })

    if (!exercise) {
      throw new Error('bad input')
    }

    const json = exercise.toJSON()

    delete json.id
    json.favourite = false
    json.matchId = matchId
    for (let i = 0; i < json.exercise_target.length; i++) {
      delete json.exercise_target[i].id
      delete json.exercise_target[i].exerciseId
      for (let j = 0; j < json.exercise_target[i].exercise_target_zone.length; j++) {
        delete json.exercise_target[i].exercise_target_zone[j].id
        delete json.exercise_target[i].exercise_target_zone[j].exerciseTargetId
      }
    }

    const response = await this.model.query().insertGraphAndFetch(json)

    this.model.skipValidation = false
    return response
  }
}
