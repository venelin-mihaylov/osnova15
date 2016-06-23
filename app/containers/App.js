/* @flow */
"use strict"
import React from "react"
import AppTopBar from "./AppTopBar"
import AppLeftNav from "./AppLeftNav"
import {connect} from "react-redux"

@connect(state => ({
  nav: state.nav
}))
export default class App extends React.Component {
  render() {
    const {
      nav: {
        leftNavOpen
      },
      children
    } = this.props

    return (
      <div>
        <AppLeftNav
          containerStyle={{top: 64}}
          open={leftNavOpen}
        />
        <AppTopBar/>
        <div style={{marginLeft: leftNavOpen ? '270' : 0}}>
          {children}
        </div>
      </div>
    )
  }
}
