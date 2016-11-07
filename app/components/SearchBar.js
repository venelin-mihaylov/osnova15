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
class SearchBar extends React.Component {

  static propTypes = {
    filters: React.PropTypes.any,
    addListFilter: React.PropTypes.func
  }

  static defaultProps = {
    //addListFilter: noop,
    filters: {
      name: {
        label: 'Name',
        operators: ['ilike', 'inotlike', '=', '<>']
      },
      email: {
        label: 'Email',
        operators: ['ilike', 'inotlike']
      }
    }
  }

  componentWillMount() {
    this.setState({
      operators: [],
    })
  }

  onFilterChange(e, {value}) {
    this.setState({
      operators: this.filterOperators(value),
      filter: value
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
  }

  filterOperators(filter) {
    return this.props.filters[filter].operators
  }

  filterOptions(filterRules) {
    return Object.values(mapValues(filterRules, (r, k) => ({
      text: r.label,
      value: k
    })))
  }

  operatorOptions(operators) {
    return Object.values(operators.map(o => ({
      text: o,
      value: o
    })))
  }

  render() {
    const filterOptions = this.filterOptions(this.props.filters)
    const operatorOptions = this.operatorOptions(this.state.operators)

    return (<Form onSubmit={this.onSubmitSearch} >
      <Form.Group>
        <Dropdown
          selection
          name='filter'
          options={filterOptions}
          onChange={this.onFilterChange}
        />
        <Dropdown
          name='operator'
          selection
          options={operatorOptions}
        />
        <Input name='value' />
        <Button type='submit' basic icon='search' />
      </Form.Group>
    </Form>)
  }
}


export default SearchBar
