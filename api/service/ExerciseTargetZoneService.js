import CRUDService from './CRUDService'
import {autobind} from 'core-decorators'

@autobind
export default class ExerciseTargetZoneService extends CRUDService {

  read(id) {
    return this.model.query().findById(id)
  }

  listQuery() {
    return this.model.query().eager('exercise')
  }

  filterRules() {
    return {
      exerciseId: (qb, {value}) => {
        const v = value.trim()
        if (!v) return qb

        return qb.whereIn('exerciseTargetId', b => b.select('id')
          .from('exercise_target')
          .where('exerciseId', '=', value))
      }
    }
  }
}
