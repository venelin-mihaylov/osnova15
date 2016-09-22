import React from 'react'
import {Flag} from 'stardust'
import OsnovaDropdown from 'components/OsnovaDropdown'
import {countries} from 'country-data'

const options = countries.all
  .filter(c => c.status === 'assigned' && Flag._meta.props.name.indexOf(c.alpha2.toLowerCase()) !== -1) // eslint-disable-line no-underscore-dangle
  .map(c => ({
    value: c.alpha2.toLowerCase(),
    name: c.name,
    text: c.name
  }))

const CountrySelect = (props) => (<OsnovaDropdown
  selection
  fluid
  search
  filter={(oo, searchText) => oo.filter(o => o.name.toLowerCase().startsWith(searchText.toLowerCase()))}
  options={options}
  {...props}
/>)
export default CountrySelect

export {CountrySelect}