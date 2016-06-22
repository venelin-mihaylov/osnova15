/* @flow */
"use strict";
import React from "react";
import AppTopBar from "./AppTopBar";
import AppLeftNav from "./AppLeftNav";
import Paper from "material-ui/Paper";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <AppLeftNav/>
        <div style={{marginLeft: 300}}>
          <AppTopBar/>
          {this.props.children}
        </div>
      </div>
    );
  }
}
