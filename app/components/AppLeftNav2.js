import React from 'react'
import {IndexLink, Link} from 'react-router'
import Sidebar from 'react-sidebar'
import {Menu} from 'semantic-ui-react'

const activeStyle = {color: 'red'}

const AppLeftNav2 = ({activeMatchId, authenticated, ...rest}) => {
  if (!authenticated) {
    return (<Sidebar
      sidebar={<Menu vertical>
        <div style={{height: 50, width: 250}}>.</div>
        <Menu.Item>
          <Link to='/login' {...{activeStyle}}><span>Login</span></Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/test' {...{activeStyle}}><span>Test</span></Link>
        </Menu.Item>
      </Menu>}
      {...rest}
    />)
  }

  // authenticated, match active
  if (activeMatchId) {
    return (<Sidebar
      sidebar={<Menu vertical>
        <div style={{height: 50, width: 250}}>.</div>
        <Menu.Item>
          <Link to={`/match/${activeMatchId}/view`} {...{activeStyle}}><span>Details</span></Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/match/${activeMatchId}/competitor`} {...{activeStyle}}><span>Competitors</span></Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/match/${activeMatchId}/exercise`} {...{activeStyle}}><span>Exercises</span></Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/match/${activeMatchId}/target`} {...{activeStyle}}><span>Targets</span></Link>
        </Menu.Item>
      </Menu>}
      {...rest}
    />)
  }

  // authenticated, no active match
  return (<Sidebar
    sidebar={<Menu vertical>
      <div style={{height: 50, width: 250}}>.</div>
      <Menu.Item>
        <IndexLink to='/' {...{activeStyle}}><span>Home</span></IndexLink>
      </Menu.Item>
      <Menu.Item>
        <Link to='/tournament' {...{activeStyle}}><span>Tournaments</span></Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/competitor' {...{activeStyle}}><span>Competitors</span></Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/exercise' {...{activeStyle}}><span>Exercises</span></Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/match' {...{activeStyle}}><span>Matches</span></Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/target' {...{activeStyle}}><span>Targets</span></Link>
      </Menu.Item>
    </Menu>}
    {...rest}
  />)


  return (<div>auth</div>)
}

AppLeftNav2.propTypes = {
  authenticated: React.PropTypes.bool,
  activeMatchId: React.PropTypes.number,
}

export default AppLeftNav2
