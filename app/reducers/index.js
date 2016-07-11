"use strict"
import {combineReducers} from "redux"
import {routerReducer as routing} from "react-router-redux"
import CRUDReducer from "./CRUDReducer"
import FKReducer from "./FKReducer"
import user from "./user"
import nav from "./nav"
import misc from './misc'
import {modelReducer, formReducer} from "react-redux-form"

// Combine reducers with routeReducer which keeps track of
// router state
// list 1:N for a particular 1
// reset form
// save 1:N for a particular 1
// error

const rootReducer = combineReducers({
  nav,
  routing,
  user,
  misc,

  tournament: CRUDReducer({entity: 'tournament'}),
  tournamentModel: modelReducer('tournamentModel', {}),
  tournamentForm: formReducer('tournamentModel', {}),

  FKtournament: FKReducer('tournament', '1'),
  FKcompetitor1: FKReducer('competitor', '1'),
  FKexercise1: FKReducer('exercise', '1'),

  match: CRUDReducer({entity: 'match'}),
  matchModel: modelReducer('matchModel'),
  matchForm: formReducer('matchModel'),

  competitor: CRUDReducer({entity: 'competitor'}),
  competitorModel: modelReducer('competitorModel', {}),
  competitorForm: formReducer('competitorModel', {}),

  matchCompetitor: CRUDReducer({entity: 'matchCompetitor'}),
  matchCompetitorModel: modelReducer('matchCompetitorModel', {}),
  matchCompetitorForm: formReducer('matchCompetitorModel', {}),

  exercise: CRUDReducer({entity: 'exercise'}),
  exerciseModel: modelReducer('exerciseModel', {}),
  exerciseForm: formReducer('exerciseModel', {}),

  matchExercise: CRUDReducer({entity: 'matchExercise'}),
  matchExerciseModel: modelReducer('matchExerciseModel', {}),
  matchExerciseForm: formReducer('matchExerciseModel', {}),

  loginUser: modelReducer('loginUser', {}),
  loginForm: formReducer('loginUser', {})
})
export default rootReducer
