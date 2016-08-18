import CRUDRest from './CRUDRest'
import * as web from 'express-decorators'

@web.controller('/exercise')
export default class ExerciseRest extends CRUDRest {

  /**
   *
   * @type {ExerciseService}
   */
  service = null

  constructor(service) {
    super(service)
    this.service = service
  }

  @web.post('/misc/createFavouriteExerciseForMatch')
  async webCreateFavouriteExerciseForMatch(req, res) {
    res.json(await this.service.createFavouriteExerciseForMatch(req.body))
  }

}
