"use strict"
import React from "react"
import Drawer from "material-ui/Drawer"
import MenuItem from "material-ui/MenuItem"
import {IndexLink, Link} from "react-router"
import RaisedButton from 'material-ui/RaisedButton'

const activeStyle = {color: 'red'}

const AppLeftNav = ({activeMatchId, onLeaveMatch, ...rest}) => {
  return (
    <Drawer {...rest}>
      <If condition={!activeMatchId}>
        <MenuItem>
          <IndexLink to="/" {...{activeStyle}}>Home</IndexLink>
        </MenuItem>
        <MenuItem>
          <Link to="/tournament" {...{activeStyle}}>Tournaments</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/competitor" {...{activeStyle}}>Competitors</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/match" {...{activeStyle}}>Matches</Link>
        </MenuItem>
      </If>
      <If condition={activeMatchId}>
        <MenuItem>
          <RaisedButton label="Leave match" onClick={onLeaveMatch} />
        </MenuItem>
        <MenuItem>
          <Link to={`/match/${activeMatchId}/competitors`} {...{activeStyle}}>Match Competitors</Link>
        </MenuItem>
      </If>
    </Drawer>
  )
}
export default AppLeftNav
