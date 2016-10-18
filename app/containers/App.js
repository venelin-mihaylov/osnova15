import React from 'react'
import AppLeftNav from './AppLeftNav'
import AppTopBar from './AppTopBar'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import Breadcrumbs from 'react-breadcrumbs'
import Act from 'constants/Act'
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'
import {Container} from 'semantic-ui-react'


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
    dispatch={dispatch}
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

  <div style={{marginTop: 30, marginLeft: leftNavOpen ? '270px' : 10}}>
    <Breadcrumbs
      routes={routes}
      params={params}
    />
    <br />
    <Container fluid>
      {children}
    </Container>
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
