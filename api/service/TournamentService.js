import CRUDService from './CRUDService'
import {autobind} from 'core-decorators'

@autobind
export default class TournamentService extends CRUDService {

  filterRules() {
    return {
      searchText: (qb, {value}) => {
        const v = value.trim()
        if (!v) return qb
        return qb.where('name', 'ilike', `%${v}%`)
      }
    }
  }
}
