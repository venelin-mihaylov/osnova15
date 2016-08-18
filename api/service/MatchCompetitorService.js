import CRUDService from './CRUDService'
import {autobind} from 'core-decorators'

@autobind
export default class MatchCompetitorService extends CRUDService {

  read(id) {
    return this.model.query()
      .findById(id)
      .eager('competitor')
  }

  listQuery() {
    return this.model.query().eager('competitor')
  }
}
