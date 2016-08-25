import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import crudReducer from './CRUDReducer'
import fkReducer from './FKReducer'
import user from './user'
import nav from './nav'
import misc from './misc'
import {modelReducer, formReducer} from 'react-redux-form'

// Combine reducers with routeReducer which keeps track of
// router statee
// list 1:N for a particular 1
// reset form
// save 1:N for a particular 1
// error

const rootReducer = combineReducers({
  nav,
  routing,
  user,
  misc,

  tournament: crudReducer({entity: 'tournament'}),
  tournamentModel: modelReducer('tournamentModel', {}),
  tournamentForm: formReducer('tournamentModel', {}),

  FKtournament1: fkReducer('tournament', '1'),
  FKcompetitor1: fkReducer('competitor', '1'),
  FKexercise1: fkReducer('exercise', '1'),
  FKtarget1: fkReducer('target', '1'),

  match: crudReducer({entity: 'match'}),
  matchModel: modelReducer('matchModel'),
  matchForm: formReducer('matchModel'),

  competitor: crudReducer({entity: 'competitor'}),
  competitorModel: modelReducer('competitorModel', {}),
  competitorForm: formReducer('competitorModel', {}),

  matchCompetitor: crudReducer({entity: 'matchCompetitor'}),
  matchCompetitorModel: modelReducer('matchCompetitorModel', {}),
  matchCompetitorForm: formReducer('matchCompetitorModel', {}),

  exercise: crudReducer({entity: 'exercise'}),
  exerciseModel: modelReducer('exerciseModel', {}),
  exerciseForm: formReducer('exerciseModel', {}),

  matchExercise: crudReducer({entity: 'matchExercise'}),
  matchExerciseModel: modelReducer('matchExerciseModel', {}),
  matchExerciseForm: formReducer('matchExerciseModel', {}),

  target: crudReducer({entity: 'target'}),
  targetModel: modelReducer('targetModel'),
  targetForm: formReducer('targetModel'),

  loginUser: modelReducer('loginUser', {}),
  loginForm: formReducer('loginUser', {})
})
export default rootReducer
