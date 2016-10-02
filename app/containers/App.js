import React from 'react'
import AppLeftNav2 from 'components/AppLeftNav2'
import AppTopBar2 from 'components/AppTopBar2'
import {connect} from 'react-redux'
import Breadcrumbs from 'react-breadcrumbs'
import Act from 'constants/Act'

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
  />

  <AppLeftNav2
    authenticated={authenticated}
    docked={leftNavOpen}
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

export default connect(state => ({ // eslint-disable-line new-cap
  nav: state.nav,
  misc: state.misc,
  user: state.user
}))(App)
