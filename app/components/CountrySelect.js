import React from 'react'
import {Flag} from 'stardust'
import OsnovaDropdown from 'components/OsnovaDropdown'
import {countries} from 'country-data'
import {autobind} from 'core-decorators'

import noop from 'lodash/noop'
import find from 'lodash/find'

const arr = countries.all.filter(c => c.status === 'assigned' && Flag._meta.props.name.indexOf(c.alpha2.toLowerCase()) !== -1).map(c => ({
  value: c.alpha2.toLowerCase(),
  text: c.name,
}))

@autobind
export default class CountrySelect extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.any,
  }

  static defaultProps = {
    onChange: noop
  }

  constructor() {
    super()
    this.state = {
      options: this.buildOptions(),
      text: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        text: find(arr, {value: nextProps.value}).text
      })
    }
  }

  onItemClick(e, value) {
    this.setState({
      text: find(this.state.options, {value}).text
    })
    this.props.onChange(e, value)
  }

  buildOptions(searchText = '') {
    return arr
      .filter(o => o.text.match(new RegExp(searchText, 'gi')))
      .map(({text, value}) => ({
        text,
        value,
        el: (<OsnovaDropdown.Item
          key={value}
          value={value}
          onClick={this.onItemClick}
        >
          <Flag name={value} />
          {text}
        </OsnovaDropdown.Item>)
      }))
  }

  render() {
    const {
      onChange, // eslint-disable-line
      ...rest
    } = this.props

    return (<OsnovaDropdown
      selection
      fluid
      search
      filter={(options) => {
        console.log('filter')
        console.log(options)
      }}
      text={this.state.text}
      onSearchChange={(e, text) => this.setState({text, options: this.buildOptions(text)})}
      {...rest}
    >
      <OsnovaDropdown.Menu>
        {this.state.options.map(({el}) => el)}
      </OsnovaDropdown.Menu>
    </OsnovaDropdown>)
  }
}
