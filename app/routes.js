import React from 'react'
import {Route, IndexRoute, IndexRedirect} from 'react-router'
import App from 'containers/App'
import TournamentListContainer from 'modules/tournament/containers/TournamentListContainer'
import TournamentFormContainer from 'modules/tournament/containers/TournamentFormContainer'

import MatchListContainer from 'modules/match/containers/MatchListContainer'
import MatchFormContainer from 'modules/match/containers/MatchFormContainer'
import MatchViewContainer from 'modules/match/containers/MatchViewContainer'

import MatchCompetitorListContainer from 'modules/matchCompetitor/containers/MatchCompetitorListContainer.js'
import MatchCompetitorFormContainer from 'modules/matchCompetitor/containers/MatchCompetitorFormContainer.js'

import CompetitorListContainer from 'modules/competitor/containers/CompetitorListContainer'
import CompetitorFormContainer from 'modules/competitor/containers/CompetitorFormContainer'

import ExerciseListContainer from 'modules/exercise/containers/ExerciseListContainer'
import ExerciseFormContainer from 'modules/exercise/containers/ExerciseFormContainer'

import ExerciseTargetZoneFormContainer from 'modules/exerciseTargetZone/containers/ExerciseTargetZoneFormContainer.js'

import TargetListContainer from 'modules/target/containers/TargetListContainer'
import TargetFormContainer from 'modules/target/containers/TargetFormContainer'

import UserListContainer from 'modules/user/containers/UserListContainer'
import UserFormContainer from 'modules/user/containers/UserFormContainer'

import LoginPage from 'containers/LoginPage'
import TestPage from 'containers/TestPage'
import ContentContainer from 'containers/ContentContainer'

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

  return (
    <Route name='Home' path='/' component={App}>
      <IndexRedirect to='match' />
      <Route name='Test' path='test' component={TestPage} onEnter={requireAuth} />
      <Route name='Login' path='login' component={LoginPage} />
      <Route name='Tournaments' path='tournament' component={ContentContainer} onEnter={requireAuth}>
        <IndexRoute component={TournamentListContainer} />
        <Route name='Add tournament' path='add' action='add' component={TournamentFormContainer} />
        <Route name='Edit tournament' staticName path=':id/edit' action='edit' component={TournamentFormContainer} />
      </Route>
      <Route name='Matches' path='match' component={ContentContainer} onEnter={requireAuth}>
        <IndexRoute component={MatchListContainer} />

        <Route name='Match view' path=':id/view' component={MatchViewContainer} />
        <Route name='Tournament view' path=':matchId/tournament' component={TournamentListContainer} />
        <Route name='List match competitors' path=':matchId/competitor' component={MatchCompetitorListContainer} />
        <Route name='Add match competitor' path=':matchId/competitor/add' action='add' component={MatchCompetitorFormContainer} />
        <Route name='Edit match competitor' path=':matchId/competitor/:id/edit' action='edit' component={MatchCompetitorFormContainer} />
        <Route name='Add new competitor' path=':matchId/competitor/add/create-competitor' action='add' component={CompetitorFormContainer} />
        <Route name='Add new competitor' path=':matchId/competitor/:id/edit/create-competitor' action='add' component={CompetitorFormContainer} />

        <Route name='List match exercises' path=':matchId/exercise' component={ExerciseListContainer} />
        <Route name='Add new exercise' path=':matchId/exercise/add' action='add' component={ExerciseFormContainer} />
        <Route name='Edit exercise' path=':matchId/exercise/:id/edit' action='edit' component={ExerciseFormContainer} />

        <Route name='Add new target' path=':matchId/exercise/add/create-target' action='add' component={TargetFormContainer} />
        <Route name='Add new target' path=':matchId/exercise/:id/edit/create-target' action='add' component={TargetFormContainer} />
        <Route name='Edit Zones' path=':matchId/exercise/:exerciseId/zones' action='edit' component={ExerciseTargetZoneFormContainer} />

        <Route name='Targets' path=':matchId/target' matchView component={TargetListContainer} />

        <Route name='Add match' path='add' action='add' component={MatchFormContainer} />
        <Route name='Edit match' staticName path=':id/edit' action='edit' component={MatchFormContainer} />
      </Route>

      <Route name='Exercises' path='exercise' component={ContentContainer} onEnter={requireAuth}>
        <IndexRoute component={ExerciseListContainer} />
        <Route name='Add exercise' path='add' action='add' component={ExerciseFormContainer} />
        <Route name='Edit exercise' staticName path=':id/edit' action='edit' component={ExerciseFormContainer} />
        <Route name='Add new target' path='add/create-target' action='add' component={TargetFormContainer} />
        <Route name='Add new target' path=':id/edit/create-target' action='add' component={TargetFormContainer} />
        <Route name='Edit Zones' path=':exerciseId/zones' action='edit' component={ExerciseTargetZoneFormContainer} />
      </Route>

      <Route name='Competitors' path='competitor' component={ContentContainer} onEnter={requireAuth} >
        <IndexRoute component={CompetitorListContainer} />
        <Route name='Add competitor' path='add' action='add' component={CompetitorFormContainer} />
        <Route name='Edit competitor' staticName path=':id/edit' action='edit' component={CompetitorFormContainer} />
      </Route>

      <Route name='Targets' path='target' component={ContentContainer} onEnter={requireAuth} >
        <IndexRoute component={TargetListContainer} />
        <Route name='Add target' path='add' action='add' component={TargetFormContainer} />
        <Route name='Edit target' staticName path=':id/edit' action='edit' component={TargetFormContainer} />
      </Route>

      <Route name='Users' path='user' component={ContentContainer} onEnter={requireAuth} >
        <IndexRoute component={UserListContainer} />
        <Route name='Add target' path='add' action='add' component={UserFormContainer} />
        <Route name='Edit target' staticName path=':id/edit' action='edit' component={UserFormContainer} />
      </Route>

    </Route>
  )
}
