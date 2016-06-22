import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "containers/App";
import TournamentListContainer from "modules/tournament/containers/TournamentListContainer";
import TournamentAddContainer from "modules/tournament/containers/TournamentAddContainer";
import TournamentEditContainer from "modules/tournament/containers/TournamentEditContainer";

import MatchListContainer from "modules/match/containers/MatchListContainer";
import MatchAddContainer from "modules/match/containers/MatchAddContainer";
import MatchEditContainer from "modules/match/containers/MatchEditContainer";

import HomePage from "containers/HomePage";
import LoginPage from "containers/LoginPage";
import ContentContainer from "containers/ContentContainer";

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to prefix
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const {user: {authenticated}} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: {nextPathname: nextState.location.pathname}
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const {user: {authenticated}} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage}/>
      <Route path="login" component={LoginPage}/>
      <Route path="tournament" component={ContentContainer}>
        <IndexRoute component={TournamentListContainer}/>
        <Route path="add" component={TournamentAddContainer}/>
        <Route path="edit/:id" component={TournamentEditContainer}/>
      </Route>
      <Route path="match" component={ContentContainer}>
        <IndexRoute component={MatchListContainer}/>
        <Route path="add" component={MatchAddContainer}/>
        <Route path="edit/:id" component={MatchEditContainer}/>
      </Route>
    </Route>
  );
};
