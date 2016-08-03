import React from 'react'
import {countries} from 'country-data'

const CountryAutoCompleteProps = {
  anchorOrigin: { vertical: 'bottom', horizontal: 'left'},
  targetOrigin: { vertical: 'bottom', horizontal: 'left'},
  maxSearchResults: 10,
  dataSource: countries.all.filter(c => c.status === 'assigned').map(c => ({text: c.name, value: c.alpha2})),
  onFocus: e => e.target.select(),
}
export default CountryAutoCompleteProps