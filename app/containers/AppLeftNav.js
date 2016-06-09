"use strict";
import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import {IndexLink, Link} from "react-router";

const AppLeftNav = props => {
  return (
    <Drawer open={true}>
      <MenuItem><IndexLink to="/" activeStyle={{ color: 'red'}}>Home</IndexLink></MenuItem>
      <MenuItem><Link to="/tournament" activeStyle={{ color: 'red'}}>Tournaments</Link></MenuItem>
      <MenuItem><Link to="/competitor" activeStyle={{ color: 'red'}}>Competitors</Link></MenuItem>
      <MenuItem><Link to="/match" activeStyle={{ color: 'red'}}>Matches</Link></MenuItem>
    </Drawer>
  );
};
export default AppLeftNav;
