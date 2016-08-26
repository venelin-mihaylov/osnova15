import {countries} from 'country-data'

const CountryAutoCompleteProps = {
  options: countries.all.filter(c => c.status === 'assigned').map(c => ({text: c.name, value: c.alpha2})),
}
export default CountryAutoCompleteProps
