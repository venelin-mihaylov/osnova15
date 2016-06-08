import expect from 'expect';
import tournamentListContainerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('tournamentListContainerReducer', () => {
  it('returns the initial state', () => {
    expect(tournamentListContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
