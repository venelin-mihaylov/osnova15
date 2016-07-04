import React from "react"
import {Route, IndexRoute} from "react-router"
import App from "containers/App"
import TournamentListContainer from "modules/tournament/containers/TournamentListContainer"
import TournamentFormContainer from "modules/tournament/containers/TournamentFormContainer"

import MatchListContainer from "modules/match/containers/MatchListContainer"
import MatchFormContainer from "modules/match/containers/MatchFormContainer"

import MatchCompetitorListContainer from 'modules/matchCompetitor/containers/MatchCompetitorListContainer.js'
import MatchCompetitorFormContainer from 'modules/matchCompetitor/containers/MatchCompetitorFormContainer.js'

import CompetitorListContainer from "modules/competitor/containers/CompetitorListContainer"
import CompetitorFormContainer from "modules/competitor/containers/CompetitorFormContainer"




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
        <Route name="Add tournament" path=":action" component={TournamentFormContainer}/>
        <Route name="Edit tournament" staticName={true} path=":id/:action" component={TournamentFormContainer}/>
      </Route>
      <Route name="Matches" path="match" component={ContentContainer}>
        <IndexRoute component={MatchListContainer}/>
        <Route name="List match competitors" path=":matchId/competitor" component={MatchCompetitorListContainer}/>
        <Route name="Add match competitor" path=":matchId/competitor/:action" component={MatchCompetitorFormContainer}/>
        <Route name="Edit match competitor" path=":matchId/competitor/:id/:action" component={MatchCompetitorFormContainer}/>
        <Route name="Add match" path="add" component={MatchFormContainer}/>
        <Route name="Edit match" staticName={true} path=":id/:action" component={MatchFormContainer}/>
      </Route>

      <Route name="Competitors" path="competitor" component={ContentContainer}>
        <IndexRoute component={CompetitorListContainer}/>
        <Route name="Add competitor" path=":action" component={CompetitorFormContainer}/>
        <Route name="Edit competitor" staticName={true} path=":id/:action" component={CompetitorFormContainer}/>
      </Route>

    </Route>
  )
}
