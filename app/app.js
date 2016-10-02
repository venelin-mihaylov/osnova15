/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import 'babel-polyfill'

// TODO constrain eslint import/no-unresolved rule to this block
// Load the manifest.json file and the .htaccess file
import 'file?name=[name].[ext]!./manifest.json'  // eslint-disable-line import/no-unresolved
import 'file?name=[name].[ext]!./.htaccess'      // eslint-disable-line import/no-unresolved

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {applyRouterMiddleware, Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import useScroll from 'react-router-scroll'
import configureStore from './store'

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/lib/sanitize.css'

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)()`
const initialState = {}
const store = configureStore(initialState, browserHistory)

const history = syncHistoryWithStore(browserHistory, store)

// Set up the router, wrapping all Routes in the App component
import createRoutes from './routes'

// add flexboxgrid
require('flexboxgrid/css/flexboxgrid.css')
// add tinycss
require('purecss/build/tables.css')

require('semantic-ui-css/semantic.css')

require('react-datepicker/dist/react-datepicker.css')

// required for material-ui to work
//injectTapEventPlugin()

// do not swallow exceptions
process.on('unhandledRejection', function (error) {
  console.error('UNHANDLED REJECTION', error.stack) // eslint-disable-line
})

ReactDOM.render(
  <Provider store={store}>
      <Router
        history={history}
        routes={createRoutes(store)}
        render={
        // Scroll to top when going to a new page, imitating default browser
        // behaviour
        applyRouterMiddleware(
          useScroll(
            (prevProps, props) => {
              if (!prevProps || !props) {
                return true
              }

              if (prevProps.location.pathname !== props.location.pathname) {
                return [0, 0]
              }

              return true
            }
          )
        )
      }
      />
  </Provider>,
  document.getElementById('app')
)

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import {install} from 'offline-plugin/runtime'
install()
