import React from 'react'
import {Button, Icon} from 'stardust'

const AppTopBar2 = ({
  onToggleSidebar,
  onLeaveMatch,
  onClickLogin,
  onClickLogout,
  activeMatchId,
  authenticated
}) => (<div className='ui fixed menu'>
  <div className='ui container'>
    <div className='item'>TCS</div>
    <div className='item'>
      <Button icon='content' basic onClick={onToggleSidebar} />
    </div>
  </div>
</div>)

AppTopBar2.propTypes = {
  onToggleSidebar: React.PropTypes.func,
  onClickLogin: React.PropTypes.func,
  onClickLogout: React.PropTypes.func,
  onLeaveMatch: React.PropTypes.func,
  activeMatchId: React.PropTypes.number,
  authenticated: React.PropTypes.bool,
}

export default AppTopBar2
