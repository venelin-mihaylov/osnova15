import CRUDService from './CRUDService'
import {autobind} from 'core-decorators'
import ItoN from '../utils/ItoN'
import MatchExerciseTargetZone from '../../universal/model/MatchExerciseTargetZone'
import {targetZoneScore} from '../../universal/scoring/scoring'

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

  async createMatchExerciseTargetZone({id: exerciseId, matchId}) {
    if (!exerciseId || !matchId) {
      return
    }

    await this.model.raw(`delete from match_exercise_target_zone where "exerciseId"=${exerciseId} AND "matchId"=${matchId}`)
    await this.model.raw(`insert into match_exercise_target_zone
    (
    "matchId", 
    "exerciseId", 
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
      "matchId", 
      "exerciseId", 
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
    where exercise.id = ${exerciseId};`)
    await MatchExerciseTargetZone.query()
      .where('exerciseId', '=', exerciseId)
      .andWhere('matchId', '=', matchId)
      .then(records => Promise.all(records.map(r => MatchExerciseTargetZone.query().patchAndFetchById(r.id, {score: targetZoneScore(r.distance, r.height, r.weight)}))))
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

  async afterUpdate(id, input, response) {
    await this.createMatchExerciseTargetZone(response)
  }

  async afterCreate(input, response) {
    await this.createMatchExerciseTargetZone(response)
  }

  /**
   * exercise
   *   -> exercise_target - distance, maxPoints
   *     -> match_exercise_target_zone - targetName, zoneName, distance,
   *
   * @returns {*|QueryBuilder}
   */
  listQuery() {
    return this.model.query().eager('[exercise_target(orderById), exercise_target.[target(orderById), match_exercise_target_zone(orderById)]]', {
      orderById: b => b.orderBy('id')
    })
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
      .then(result => this.createMatchExerciseTargetZone({id: result.id, matchId}))
  }
}
