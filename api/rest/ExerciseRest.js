import CRUDRest from './CRUDRest'
import * as web from 'express-decorators'

@web.controller('/exercise')
export default class ExerciseRest extends CRUDRest {

  @web.post('/misc/createFavouriteExerciseForMatch')
  async webCreateFavouriteExerciseForMatch(req, res) {
    res.json(await this.service.createFavouriteExerciseForMatch(req.body))
  }

}
