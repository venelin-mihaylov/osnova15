/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import {autobind} from 'core-decorators'
import {Message, Button, Input} from 'semantic-ui-react'
import {Form, actions} from 'react-redux-form'
import {connect} from 'react-redux'

@connect(() => ({}))
@autobind
export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    dispatch: React.PropTypes.func,
    model: React.PropTypes.any
  }

  render() {
    return (<div style={{marginRight: 10}}>
      <h1>Welcome back, Gringo!</h1>
    </div>)
  }
}
