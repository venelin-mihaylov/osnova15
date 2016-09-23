import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Helmet from 'react-helmet'
import config from 'helmconfig.js'

// Remove stylesheets because we do not extract them into a css file
// in development mode
if (__DEVSERVER__) { // eslint-disable-line
  config.link = config.link.filter(l => l.rel !== 'stylesheet')
}

const Meta = () => (
  <Helmet
    title='TCS'
    meta={config.meta}
    link={config.link}
  />)

ReactDOMServer.renderToString(<Meta />)
const header = Helmet.rewind()
export default header
