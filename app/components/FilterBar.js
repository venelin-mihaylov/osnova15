import React from 'react'
import {Dropdown, Input, Form, Button} from 'semantic-ui-react'
import mapValues from 'lodash/mapValues'
import {autobind} from 'core-decorators'
import noop from 'lodash/noop'

/**
 * SearchBar allows
 *
 */
@autobind
class FilterBar extends React.Component {

  static propTypes = {
    filterSchema: React.PropTypes.any,
    addListFilter: React.PropTypes.func
  }

  static defaultProps = {
    addListFilter: noop
  }

  componentWillMount() {
    this.setState({
      operators: [],
      filter: '', // current filter
      operator: '', // current operator
      value: '', // current value
    })
  }

  onChangeFilter(e, {value: filter}) {
    this.setState({
      filter,
      operator: this.props.filterSchema[filter].operators[0],
      value: ''
    })
  }

  onChangeValue(e) {
    this.setState({
      value: e.target.value
    })
  }

  onChangeEnumValue(e, {value}) {
    this.setState({
      value
    })
  }

  onChangeOperator(e, {value}) {
    this.setState({
      operator: value
    })
  }

  onSubmitSearch(e, {filter, operator, value}) {
    e.preventDefault()
    this.props.addListFilter({
      [filter]: {
        operator,
        value
      }
    })
    this.setState({
      filter: '',
      operator: '',
      value: ''
    })
  }

  filterOptions(filterRules) {
    return Object.values(mapValues(filterRules, (r, k) => ({
      text: r.label,
      value: k
    })))
  }

  operatorOptions(operators) {
    if (!operators) {
      return []
    }
    return Object.values(operators.map(o => ({
      value: o,
      text: o,
    })))
  }

  enumOptions(enumProps) {
    const ret = Object.keys(enumProps).map(k => ({
      value: k,
      text: enumProps[k]
    }))
    return ret
  }

  isVisibleOperator() {
    return this.state.filter
  }
  isVisibleNumberValue() {
    return this.state.filter && this.state.operator && this.curFilter().type === 'number' && !this.curFilter().enumProps
  }
  isVisibleStringValue() {
    return this.state.filter && this.state.operator && this.curFilter().type === 'string' && !this.curFilter().enumProps
  }
  isVisibleEnumValue() {
    return this.state.filter && this.state.operator && !!this.curFilter().enumProps
  }
  isVisibleSubmitButton() {
    return this.state.filter && this.state.operator && this.state.value
  }

  curFilter() {
    return this.props.filterSchema[this.state.filter] || {}
  }

  render() {
    if (!this.props.filterSchema) {
      return null
    }

    const filterOptions = this.filterOptions(this.props.filterSchema)
    const operatorOptions = this.operatorOptions(this.curFilter().operators)

    return (<Form onSubmit={this.onSubmitSearch} >
      <Form.Group>
        <Form.Dropdown
          name='filter'
          selection
          required
          label=''
          value={this.state.filter}
          options={filterOptions}
          onChange={this.onChangeFilter}
        />
        {this.isVisibleOperator() && <Form.Dropdown
          name='operator'
          selection
          required
          label=''
          value={this.state.operator}
          onChange={this.onChangeOperator}
          options={operatorOptions}
        />}
        {this.isVisibleNumberValue() && <Form.Input
          name='value'
          label=''
          required
          value={this.state.value}
          onChange={this.onChangeValue}
        />}
        {this.isVisibleStringValue() && <Form.Input
          name='value'
          required
          label=''
          value={this.state.value}
          onChange={this.onChangeValue}
        />}
        {this.isVisibleEnumValue() && <Form.Dropdown
          name='value'
          selection
          required
          label=''
          value={this.state.value}
          options={this.enumOptions(this.curFilter().enumProps)}
          onChange={this.onChangeEnumValue}
        />}
        {this.isVisibleSubmitButton() && <Form.Button
          disabled={!this.state.filter || !this.state.operator || !this.state.value}
          basic
          type='submit'
          icon='search'
        />}
      </Form.Group>
    </Form>)
  }
}


export default FilterBar
