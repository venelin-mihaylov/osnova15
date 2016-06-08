import { createSelector } from 'reselect';

/**
 * Direct selector to the tournamentListContainer state domain
 */
const selectTournamentListContainerDomain = () => state => state.get('tournamentListContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TournamentListContainer
 */

const selectTournamentListContainer = () => createSelector(
  selectTournamentListContainerDomain(),
  (substate) => substate.toJS()
);

export default selectTournamentListContainer;
export {
  selectTournamentListContainerDomain,
};
