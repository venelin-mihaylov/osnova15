import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import crudReducer from './CRUDReducer'
import listReducer from './listReducer'
import fkReducer from './FKReducer'
import user from './user'
import nav from './nav'
import misc from './misc'
import {modelReducer, formReducer, combineForms} from 'react-redux-form'
import {listStatePath, crudStatePath, fkStatePath} from 'utils/Util'

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

  [crudStatePath('tournament')]: crudReducer({entity: 'tournament'}),
  [listStatePath('tournament')]: listReducer({entity: 'tournament'}),

  // tournamentModel: modelReducer('tournamentModel', {}),
  // tournamentForm: formReducer('tournamentModel', {}),

  [crudStatePath('match')]: crudReducer({entity: 'match'}),
  [listStatePath('match')]: listReducer({entity: 'match'}),

  // matchModel: modelReducer('matchModel', {}),
  // matchForm: formReducer('matchModel', {}),

  [crudStatePath('competitor')]: crudReducer({entity: 'competitor'}),
  [listStatePath('competitor')]: listReducer({entity: 'competitor'}),

  // competitorModel: modelReducer('competitorModel', {}),
  // competitorForm: formReducer('competitorModel', {}),

  [crudStatePath('matchCompetitor')]: crudReducer({entity: 'matchCompetitor'}),
  [listStatePath('matchCompetitor')]: listReducer({entity: 'matchCompetitor'}),

  // matchCompetitorModel: modelReducer('matchCompetitorModel', {}),
  // matchCompetitorForm: formReducer('matchCompetitorModel', {}),

  [crudStatePath('exercise')]: crudReducer({entity: 'exercise'}),
  [listStatePath('exercise')]: listReducer({entity: 'exercise'}),

  // exerciseModel: modelReducer('exerciseModel', {}),
  // exerciseForm: formReducer('exerciseModel', {}),

  [crudStatePath('matchExercise')]: crudReducer({entity: 'matchExercise'}),
  [listStatePath('matchExercise')]: listReducer({entity: 'matchExercise'}),

  // matchExerciseModel: modelReducer('matchExerciseModel', {}),
  // matchExerciseForm: formReducer('matchExerciseModel', {}),

  [crudStatePath('target')]: crudReducer({entity: 'target'}),
  [listStatePath('target')]: listReducer({entity: 'target'}),

  // targetModel: modelReducer('targetModel'),
  // targetForm: formReducer('targetModel'),

  //loginUser: modelReducer('loginUser', {}),
  //loginForm: formReducer('loginUser', {}),

  [fkStatePath('tournament', '1')]: fkReducer('tournament', '1'),
  [fkStatePath('competitor', '1')]: fkReducer('competitor', '1'),
  [fkStatePath('exercise', '1')]: fkReducer('exercise', '1'),
  [fkStatePath('target', '1')]: fkReducer('target', '1'),

  rrf: combineForms({
    login: {},
    tournament: {},
    match: {},
    competitor: {},
    matchCompetitor: {},
    exercise: {},
    target: {},
  }, 'rrf')
})
export default rootReducer
