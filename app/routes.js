import React from "react"
import {Route, IndexRoute} from "react-router"
import App from "containers/App"
import TournamentListContainer from "modules/tournament/containers/TournamentListContainer"
import TournamentFormContainer from "modules/tournament/containers/TournamentFormContainer"

import MatchListContainer from "modules/match/containers/MatchListContainer"
import MatchFormContainer from "modules/match/containers/MatchFormContainer"
import MatchViewContainer from 'modules/match/containers/MatchViewContainer'

import MatchCompetitorListContainer from 'modules/matchCompetitor/containers/MatchCompetitorListContainer.js'
import MatchCompetitorFormContainer from 'modules/matchCompetitor/containers/MatchCompetitorFormContainer.js'

import CompetitorListContainer from "modules/competitor/containers/CompetitorListContainer"
import CompetitorFormContainer from "modules/competitor/containers/CompetitorFormContainer"

import ExerciseListContainer from "modules/exercise/containers/ExerciseListContainer"
import ExerciseFormContainer from "modules/exercise/containers/ExerciseFormContainer"

import MatchExerciseListContainer from 'modules/matchExercise/containers/MatchExerciseListContainer.js'
import MatchExerciseFormContainer from 'modules/matchExercise/containers/MatchExerciseFormContainer.js'


import HomePage from "containers/HomePage"
import LoginPage from "containers/LoginPage"
import ContentContainer from "containers/ContentContainer"

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to prefix
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const {user: {authenticated}} = store.getState()
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: {nextPathname: nextState.location.pathname}
      })
    }
    callback()
  }

  const redirectAuth = (nextState, replace, callback) => {
    const {user: {authenticated}} = store.getState()
    if (authenticated) {
      replace({
        pathname: '/'
      })
    }
    callback()
  }

  return (
    <Route name="Home" path="/" component={App}>
      <IndexRoute component={HomePage}/>
      <Route name="Login" path="login" component={LoginPage}/>
      <Route name="Tournaments" path="tournament" component={ContentContainer}>
        <IndexRoute component={TournamentListContainer}/>
        <Route name="Add tournament" path="add" action="add" component={TournamentFormContainer}/>
        <Route name="Edit tournament" staticName={true} path=":id/edit" action="edit" component={TournamentFormContainer}/>
      </Route>
      <Route name="Matches" path="match" component={ContentContainer}>
        <IndexRoute component={MatchListContainer}/>
        <Route name="Match view" path=":matchId/view" component={MatchViewContainer}/>
        
        <Route name="List match competitors" path=":matchId/competitor" component={MatchCompetitorListContainer}/>
        <Route name="Add match competitor" path=":matchId/competitor/add" action="add" component={MatchCompetitorFormContainer}/>
        <Route name="Edit match competitor" path=":matchId/competitor/:id/edit" action="edit" component={MatchCompetitorFormContainer}/>
        <Route name="Add new competitor" path=":matchId/competitor/add/create-competitor" action="add" component={CompetitorFormContainer}/>
        <Route name="Add new competitor" path=":matchId/competitor/:id/edit/create-competitor" action="add" component={CompetitorFormContainer}/>

        <Route name="List match exercises" path=":matchId/exercise" component={MatchExerciseListContainer}/>
        <Route name="Add match exercise" path=":matchId/exercise/add" action="add" component={MatchExerciseFormContainer}/>
        <Route name="Edit match exercise" path=":matchId/exercise/:id/edit" action="edit" component={MatchExerciseFormContainer}/>
        <Route name="Add new exercise" path=":matchId/exercise/add/create-exercise" action="add" component={ExerciseFormContainer}/>
        <Route name="Add new exercise" path=":matchId/exercise/:id/edit/create-exercise" action="add" component={ExerciseFormContainer}/>

        
        <Route name="Add match" path="add" component={MatchFormContainer}/>
        <Route name="Edit match" staticName={true} path=":id/edit" action="edit" component={MatchFormContainer}/>
      </Route>

      <Route name="Exercises" path="exercise" component={ContentContainer}>
        <IndexRoute component={ExerciseListContainer}/>
        <Route name="Add exercise" path="add" action="add" component={ExerciseFormContainer}/>
        <Route name="Edit exercise" staticName={true} path=":id/edit" action="edit" component={ExerciseFormContainer}/>
      </Route>

      <Route name="Competitors" path="competitor" component={ContentContainer}>
        <IndexRoute component={CompetitorListContainer}/>
        <Route name="Add competitor" path="add" action="add" component={CompetitorFormContainer}/>
        <Route name="Edit competitor" staticName={true} path=":id/edit" action="edit" component={CompetitorFormContainer}/>
      </Route>

    </Route>
  )
}
