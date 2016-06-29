import React from "react"
import {Route, IndexRoute} from "react-router"
import App from "containers/App"
import TournamentListContainer from "modules/tournament/containers/TournamentListContainer"
import TournamentAddContainer from "modules/tournament/containers/TournamentAddContainer"
import TournamentEditContainer from "modules/tournament/containers/TournamentEditContainer"

import MatchListContainer from "modules/match/containers/MatchListContainer"
import MatchAddContainer from "modules/match/containers/MatchAddContainer"
import MatchEditContainer from "modules/match/containers/MatchEditContainer"
import MatchCompetitorEditContainer from 'modules/match/containers/MatchCompetitorEditContainer.js'

import CompetitorListContainer from "modules/competitor/containers/CompetitorListContainer"
import CompetitorAddContainer from "modules/competitor/containers/CompetitorAddContainer"
import CompetitorEditContainer from "modules/competitor/containers/CompetitorEditContainer"




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
        <Route name="Add tournament" path="add" component={TournamentAddContainer}/>
        <Route name="Edit tournament" staticName={true} path="edit/:id" component={TournamentEditContainer}/>
      </Route>
      <Route name="Matches" path="match" component={ContentContainer}>
        <IndexRoute component={MatchListContainer}/>
        <Route name="Add match" path="add" component={MatchAddContainer}/>
        <Route name="Edit match" staticName={true} path="edit/:id" component={MatchEditContainer}/>
        <Route name="Edit match competitors" path=":parentId/competitor" component={MatchCompetitorEditContainer}/>
      </Route>

      <Route name="Competitors" path="competitor" component={ContentContainer}>
        <IndexRoute component={CompetitorListContainer}/>
        <Route name="Add competitor" path="add" component={CompetitorAddContainer}/>
        <Route name="Edit competitor" staticName={true} path="edit/:id" component={CompetitorEditContainer}/>
      </Route>

    </Route>
  )
}
