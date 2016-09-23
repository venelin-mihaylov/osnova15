import CRUDService from './CRUDService'
import {autobind} from 'core-decorators'

@autobind
export default class MatchExerciseTargetZoneService extends CRUDService {

  read(id) {
    return this.model.query().findById(id)
  }

  listQuery() {
    return this.model.query().eager('exercise')
  }
}
