/* @flow */
"use strict"
import React from "react"
import AppTopBar from "./AppTopBar"
import AppLeftNav from "./AppLeftNav"
import {connect} from "react-redux"
import Breadcrumbs from 'react-breadcrumbs'
import ActionType from 'constants/ActionType'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';


@DragDropContext(HTML5Backend)
@connect(state => ({
  nav: state.nav
}))
export default class App extends React.Component {
  render() {
    const {
      dispatch,
      nav: {
        leftNavOpen,
        activeMatchId
      },
      children
    } = this.props

    return (
      <div>
        <AppLeftNav
          containerStyle={{top: 64}}
          open={leftNavOpen}
          {...{activeMatchId}}

        />
        <AppTopBar
          {...{activeMatchId}}
          onLeaveMatch={() => dispatch({type: ActionType.EXIT_MATCH})}
        />
        <div style={{marginLeft: leftNavOpen ? '270px' : 10}}>
          <Breadcrumbs
            routes={this.props.routes}
            params={this.props.params}
          />
          {children}
        </div>
      </div>
    )
  }
}
