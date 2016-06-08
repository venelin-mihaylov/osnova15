/*
 *
 * TournamentListContainer
 *
 */

import React from 'react';
import {Icon} from 'react-fa';
import {connect} from 'react-redux';
import selectTournamentListContainer from './selectors';
import RaisedButton from "material-ui/RaisedButton";
import styles from './styles.css';

export class TournamentListContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={ styles.tournamentListContainer }>
        <Icon name="fire"/>
        <RaisedButton label="Submit"
                      primary={true}
                      type="submit"
                      style={{margin: 5}}
        />
        <p>This is TournamentListContainer container !</p>
      </div>
    );
  }
}

const mapStateToProps = selectTournamentListContainer();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentListContainer);
