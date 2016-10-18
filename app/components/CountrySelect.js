import React from 'react'
import {Flag, Search, Icon, Button} from 'semantic-ui-react'
import {countries} from 'country-data'
import {autobind} from 'core-decorators'
import isFunction from 'lodash/isFunction'

const options = countries.all
  .filter(c => c.status === 'assigned' && Flag._meta.props.name.indexOf(c.alpha2.toLowerCase()) !== -1) // eslint-disable-line no-underscore-dangle
  .map(c => ({
    value: c.alpha2.toLowerCase(),
    title: c.name
  }))

@autobind
export default class CountrySelect extends React.Component {

  static propTypes = {
    value: React.PropTypes.any,
    onFocus: React.PropTypes.func,
    onChange: React.PropTypes.func,
  }

  static defaultProps = {
    onFocus: () => {},
    onChange: () => {}
  }

  componentWillMount() {
    this.onNewValue(this.props.value)
  }

  componentWillReceiveProps(nextProps) {
    this.onNewValue(nextProps.value)
  }

  onSearchChange(e, searchText) {
    this.setState({
      results: this.searchByText(searchText),
      label: searchText
    })
  }

  label(value) {
    if (!value) {
      return ' '
    }
    if (value.length !== 2) {
      return value
    }
    const r = options.find(o => o.value === value)
    if (r) {
      return r.title
    }
    return value || ' '
  }

  onNewValue(value) {
    const label = this.label(value)
    const results = this.searchByText(label)
    this.setState({results, label})
  }

  setNull(e) {
    e.preventDefault()
    this.setState({
      results: [],
      label: ' ',
    })
    this.props.onChange(e, {value: ''})
  }

  searchByText(text) {
    if (!text) {
      return options.slice(0, 5)
    }
    return options.filter(o => o.title.toLowerCase().startsWith(text.trim().toLowerCase())).slice(0, 5)
  }

  render() {
    const {
      value, // do not pass
      onFocus, // do not pass
      ...rest
    } = this.props

    return (<Search
      selectFirstResult
      results={this.state.results}
      onSearchChange={this.onSearchChange}
      value={this.state.label}
      onFocus={e => isFunction(e.target.select) && e.target.select()}
      icon={<Button icon='erase' basic onClick={this.setNull} />}
      {...(rest)}
    />)
  }


}
