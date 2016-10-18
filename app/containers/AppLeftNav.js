import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import {IndexLink, Link} from 'react-router'
import {push} from 'react-router-redux'

const activeStyle = {color: 'red'}

const AppLeftNav = ({dispatch, activeMatchId, authenticated, ...rest}) => {
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
        <MenuItem onClick={() => dispatch(push('/'))}>
          <IndexLink to='/' {...{activeStyle}}><span>Home</span></IndexLink>
        </MenuItem>
        <MenuItem onClick={() => dispatch(push('/tournament'))}>
          <Link to='/tournament' {...{activeStyle}}><span>Tournaments</span></Link>
        </MenuItem>
        <MenuItem onClick={() => dispatch(push('/competitor'))}>
          <Link to='/competitor' {...{activeStyle}}><span>Competitors</span></Link>
        </MenuItem>
        <MenuItem onClick={() => dispatch(push('/exercise'))}>
          <Link to='/exercise' {...{activeStyle}}><span>Exercises</span></Link>
        </MenuItem>
        <MenuItem onClick={() => dispatch(push('/match'))}>
          <Link to='/match' {...{activeStyle}}><span>Matches</span></Link>
        </MenuItem>
        <MenuItem onClick={() => dispatch(push('/target'))}>
          <Link to='/target' {...{activeStyle}}><span>Targets</span></Link>
        </MenuItem>
      </If>
      <If condition={activeMatchId}>
        <MenuItem onClick={() => dispatch(push(`/match/${activeMatchId}/view`))}>
          <Link to={`/match/${activeMatchId}/view`} {...{activeStyle}}><span>Details</span></Link>
        </MenuItem>
        <MenuItem onClick={() => dispatch(push(`/match/${activeMatchId}/competitor`))}>
          <Link to={`/match/${activeMatchId}/competitor`} {...{activeStyle}}><span>Competitors</span></Link>
        </MenuItem>
        <MenuItem onClick={() => dispatch(push(`/match/${activeMatchId}/exercise`))}>
          <Link to={`/match/${activeMatchId}/exercise`} {...{activeStyle}}><span>Exercises</span></Link>
        </MenuItem>
        <MenuItem onClick={() => dispatch(push(`/match/${activeMatchId}/target`))}>
          <Link to={`/match/${activeMatchId}/target`} {...{activeStyle}}><span>Targets</span></Link>
        </MenuItem>
      </If>
    </Drawer>
  )
}

AppLeftNav.propTypes = {
  dispatch: React.PropTypes.func,
  authenticated: React.PropTypes.bool,
  activeMatchId: React.PropTypes.number,
}

export default AppLeftNav
