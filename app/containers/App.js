import React from 'react'
import AppTopBar from './AppTopBar'
import AppLeftNav from './AppLeftNav'
import {connect} from 'react-redux'
import Breadcrumbs from 'react-breadcrumbs'
import Act from 'constants/Act'
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'

const App = ({
  dispatch,
  nav: {
    leftNavOpen,
    activeMatchId
  },
  children,
  routes,
  params
}) => (<div>
  <AppLeftNav
    containerStyle={{top: 64}}
    open={leftNavOpen}
    {...{activeMatchId}}
  />
  <AppTopBar
    {...{activeMatchId}}
    onLeaveMatch={() => dispatch({type: Act.EXIT_MATCH})}
  />
  <div style={{marginLeft: leftNavOpen ? '270px' : 10}}>
    <Breadcrumbs
      routes={routes}
      params={params}
    />
    {children}
  </div>
</div>)

App.propTypes = {
  dispatch: React.PropTypes.func,
  nav: React.PropTypes.any,
  children: React.PropTypes.any,
  routes: React.PropTypes.any,
  params: React.PropTypes.any,
}

export default DragDropContext(HTML5Backend)(connect(state => ({nav: state.nav}))(App)) // eslint-disable-line new-cap
