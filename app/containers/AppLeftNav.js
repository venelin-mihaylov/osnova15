import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import {IndexLink, Link} from 'react-router'

const activeStyle = {color: 'red'}

const AppLeftNav = ({activeMatchId, authenticated, ...rest}) => {
  if (!authenticated) {
    return (<Drawer {...rest}>
      <MenuItem>
        <IndexLink to='/' {...{activeStyle}}>Home</IndexLink>
      </MenuItem>
      <MenuItem>
        <IndexLink to='/test' {...{activeStyle}}>Test</IndexLink>
      </MenuItem>
    </Drawer>)
  }

  return (
    <Drawer {...rest}>
      <If condition={!activeMatchId}>
        <MenuItem>
          <IndexLink to='/' {...{activeStyle}}><span>Home</span></IndexLink>
        </MenuItem>
        <MenuItem>
          <Link to='/tournament' {...{activeStyle}}><span>Tournaments</span></Link>
        </MenuItem>
        <MenuItem>
          <Link to='/competitor' {...{activeStyle}}><span>Competitors</span></Link>
        </MenuItem>
        <MenuItem>
          <Link to='/exercise' {...{activeStyle}}><span>Exercises</span></Link>
        </MenuItem>
        <MenuItem>
          <Link to='/match' {...{activeStyle}}><span>Matches</span></Link>
        </MenuItem>
        <MenuItem>
          <Link to='/target' {...{activeStyle}}><span>Targets</span></Link>
        </MenuItem>
      </If>
      <If condition={activeMatchId}>
        <MenuItem>
          <Link to={`/match/${activeMatchId}/view`} {...{activeStyle}}><span>Details</span></Link>
        </MenuItem>
        <MenuItem>
          <Link to={`/match/${activeMatchId}/competitor`} {...{activeStyle}}><span>Competitors</span></Link>
        </MenuItem>
        <MenuItem>
          <Link to={`/match/${activeMatchId}/exercise`} {...{activeStyle}}><span>Exercises</span></Link>
        </MenuItem>
        <MenuItem>
          <Link to={`/match/${activeMatchId}/target`} {...{activeStyle}}><span>Targets</span></Link>
        </MenuItem>
      </If>
    </Drawer>
  )
}

AppLeftNav.propTypes = {
  authenticated: React.PropTypes.bool,
  activeMatchId: React.PropTypes.number,
}

export default AppLeftNav
