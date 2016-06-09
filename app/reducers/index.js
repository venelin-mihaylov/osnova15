"use strict";
import {combineReducers} from "redux";
import {routerReducer as routing} from "react-router-redux";
import createCRUDReducer from "utils/CRUDReducer";
import createFKReducer from "utils/FKReducer.js";
import user from "reducers/user";
import nav from "reducers/nav";
import {modelReducer, formReducer} from "react-redux-form";

// Combine reducers with routeReducer which keeps track of
// router state

const rootReducer = combineReducers({
  nav,
  routing,
  user,

  competitor: createCRUDReducer('competitor'),
  competitorModel: modelReducer('competitorModel', {}),
  competitorForm: formReducer('competitorModel', {}),

  tournament: createCRUDReducer('tournament'),
  tournamentModel: modelReducer('tournamentModel', {}),
  tournamentForm: formReducer('tournamentModel', {}),

  FKtournament: createFKReducer('tournament'),

  match: createCRUDReducer('match'),
  matchModel: modelReducer('matchModel', {}),
  matchForm: formReducer('matchModel', {}),

  loginUser: modelReducer('loginUser', {}),
  loginForm: formReducer('loginUser', {})
});
export default rootReducer;
