import React from 'react'
import {Dropdown} from 'stardust'
import {countries} from 'country-data'

const options = countries.all.filter(c => c.status === 'assigned').map(c => ({
  value: c.alpha2.toLowerCase(),
  text: c.name,
}))

const CountrySelect = (props) => (<Dropdown
  selection
  fluid
  search
  options={options}
  {...props}
/>)

export default CountrySelect
