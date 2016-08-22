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
    </Drawer>)
  }

  return (
    <Drawer {...rest}>
      <If condition={!activeMatchId}>
        <MenuItem>
          <IndexLink to='/' {...{activeStyle}}>Home</IndexLink>
        </MenuItem>
        <MenuItem>
          <Link to='/tournament' {...{activeStyle}}>Tournaments</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/competitor' {...{activeStyle}}>Competitors</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/exercise' {...{activeStyle}}>Exercises</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/match' {...{activeStyle}}>Matches</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/target' {...{activeStyle}}>Targets</Link>
        </MenuItem>
      </If>
      <If condition={activeMatchId}>
        <MenuItem>
          <Link to={`/match/${activeMatchId}/view`} {...{activeStyle}}>Details</Link>
        </MenuItem>
        <MenuItem>
          <Link to={`/match/${activeMatchId}/tournament`} {...{activeStyle}}>Tournaments</Link>
        </MenuItem>
        <MenuItem>
          <Link to={`/match/${activeMatchId}/competitor`} {...{activeStyle}}>Competitors</Link>
        </MenuItem>
        <MenuItem>
          <Link to={`/match/${activeMatchId}/exercise`} {...{activeStyle}}>Exercises</Link>
        </MenuItem>
        <MenuItem>
          <Link to={`/match/${activeMatchId}/target`} {...{activeStyle}}>Targets</Link>
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
