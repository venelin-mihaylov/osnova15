/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import CountrySelect from 'components/CountrySelect'
import OsnovaDropdown from 'components/OsnovaDropdown'
import {Flag} from 'stardust'

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (<div style={{marginRight: 10}}>
      <h1>Welcome back, Gringo!</h1>
      <CountrySelect />
      <OsnovaDropdown
        fluid
        selection
        search
        filter={(options, searchText) => options.filter(o => o.text.toLowerCase().startsWith(searchText))}
        options={[{
          value: 1,
          text: 'Venelin Mihaylov',
          children: <div><p><Flag name='bg' />Bulgaria</p><p>Phone: 1231231</p></div>
        }, {
          value: 2,
          text: '2'
        }]}
      />
    </div>)
  }
}
