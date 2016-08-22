import React from 'react'
import AppTopBar from './AppTopBar'
import AppLeftNav from './AppLeftNav'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Breadcrumbs from 'react-breadcrumbs'
import Act from 'constants/Act'
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'
import Snackbar from 'material-ui/Snackbar'

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
  <AppLeftNav
    containerStyle={{top: 64}}
    open={leftNavOpen}
    {...{activeMatchId, authenticated}}
  />
  <AppTopBar
    {...{activeMatchId, user, dispatch}}
    onClickLogin={() => dispatch(push('/login'))}
    onClickLogout={() => dispatch({type: Act.LOGOUT_USER_REQUESTED})}
    onLeaveMatch={() => {
      dispatch({type: Act.EXIT_MATCH})
      dispatch(push('/match'))
    }}
  />
  <div style={{marginLeft: leftNavOpen ? '270px' : 10}}>
    <Breadcrumbs
      routes={routes}
      params={params}
    />
    {children}
  </div>
  {flashMessage && <Snackbar
    open={flash}
    message={flashMessage}
    autoHideDuration={flashDuration}
    onRequestClose={() => dispatch({type: Act.FLASH_MESSAGE_END})}
  />}
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
