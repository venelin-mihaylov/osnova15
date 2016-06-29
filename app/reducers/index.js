"use strict"
import {combineReducers} from "redux"
import {routerReducer as routing} from "react-router-redux"
import CRUDReducer from "./CRUDReducer"
import FKReducer from "./FKReducer"
import ItoNReducer from './ItoNReducer'
import user from "./user"
import nav from "./nav"
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

  competitor: CRUDReducer('competitor'),
  competitorModel: modelReducer('competitorModel', {}),
  competitorForm: formReducer('competitorModel', {}),

  tournament: CRUDReducer('tournament'),
  tournamentModel: modelReducer('tournamentModel', {}),
  tournamentForm: formReducer('tournamentModel', {}),

  FKtournament: FKReducer('tournament', '1'),
  FKcompetitor1: FKReducer('competitor', '1'),

  ItoNMatchCompetitor: ItoNReducer('match', 'competitor'),
  matchCompetitorModel: modelReducer('matchCompetitorModel'),
  matchCompetitorForm: formReducer('matchCompetitorModel'),

  match: CRUDReducer('match'),
  matchModel: modelReducer('matchModel'),
  matchForm: formReducer('matchModel'),

  loginUser: modelReducer('loginUser', {}),
  loginForm: formReducer('loginUser', {})
})
export default rootReducer
