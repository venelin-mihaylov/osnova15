import React from 'react'
import AppLeftNav2 from 'components/AppLeftNav2'
import AppTopBar2 from 'components/AppTopBar2'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Breadcrumbs from 'react-breadcrumbs'
import Act from 'constants/Act'
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'

const App = ({
  dispatch,
  user,
  user: {
    authenticated
  },
  nav: {
    leftNavOpen,
    activeMatchId
  },
  misc: {
    flash,
    flashMessage,
    flashDuration
  },
  children,
  routes,
  params
}) => (<div>

  <AppTopBar2
    authenticated={authenticated}
    onToggleSidebar={() => dispatch({type: Act.TOGGLE_LEFT_NAV})}
    onClickLogin={() => dispatch(push('/login'))}
    onClickLogout={() => dispatch({type: Act.LOGOUT_USER_REQUESTED})}
    onLeaveMatch={() => {
      dispatch({type: Act.EXIT_MATCH})
      dispatch(push('/match'))
    }}
  />

  <AppLeftNav2
    authenticated={authenticated}
    docked={leftNavOpen}
    activeMatchId={activeMatchId}
  />

  <div style={{marginTop: 30, marginLeft: leftNavOpen ? '250px' : 10}}>
    <Breadcrumbs
      routes={routes}
      params={params}
    />
    {children}
  </div>
</div>)

App.propTypes = {
  dispatch: React.PropTypes.func,
  user: React.PropTypes.any,
  nav: React.PropTypes.any,
  misc: React.PropTypes.any,
  children: React.PropTypes.any,
  routes: React.PropTypes.any,
  params: React.PropTypes.any,
}

export default DragDropContext(HTML5Backend)(connect(state => ({ // eslint-disable-line new-cap
  nav: state.nav,
  misc: state.misc,
  user: state.user
}))(App))
