import React from 'react'
import {IndexLink, Link} from 'react-router'
import Sidebar from 'react-sidebar'
import {Menu} from 'stardust'

const activeStyle = {color: 'red'}

const AppLeftNav2 = ({activeMatchId, authenticated, ...rest}) => {
  if (!authenticated) {
    return (<Sidebar
      sidebar={<Menu vertical>
        <div style={{height: 60, width: 250}}>.</div>
        <Menu.Item>
          Inbox
        </Menu.Item>
        <Menu.Item>
          Inbox
        </Menu.Item>
        <Menu.Item>
          Inbox
        </Menu.Item>
        <Menu.Item>
          Inbox
        </Menu.Item>
        <Menu.Item>
          Inbox
        </Menu.Item>
        <Menu.Item>
          Inbox
        </Menu.Item>
        <Menu.Item>
          Inbox
        </Menu.Item>
      </Menu>}
      {...rest}
    />)
  }

  return (<div>auth</div>)
}

AppLeftNav2.propTypes = {
  authenticated: React.PropTypes.bool,
  activeMatchId: React.PropTypes.number,
}

export default AppLeftNav2
