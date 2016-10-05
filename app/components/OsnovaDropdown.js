import React from 'react'
import {Dropdown} from 'semantic-ui-react'
import _ from 'lodash'

export default class OsnovaDropdown extends Dropdown {

  static propTypes = Object.assign(Dropdown.propTypes, {
    filter: React.PropTypes.func
  })

  getMenuOptions = () => {
    const {multiple, search, allowAdditions, additionPosition, additionLabel, options, filter} = this.props
    const {searchQuery, value} = this.state

    let filteredOptions = options

    // filter out active options
    if (multiple) {
      filteredOptions = _.filter(filteredOptions, opt => !_.includes(value, opt.value))
    }

    // filter by search query
    if (search && searchQuery) {
      if (_.isFunction(filter)) {
        filteredOptions = filter(filteredOptions, searchQuery)
      } else {
        const re = new RegExp(_.escapeRegExp(searchQuery), 'i')
        filteredOptions = _.filter(filteredOptions, (opt) => re.test(opt.text))
      }
    }

    // insert the "add" item
    if (allowAdditions && search && searchQuery && !_.some(filteredOptions, {text: searchQuery})) {
      const addItem = {
        text: additionLabel ? `${additionLabel} ${searchQuery}` : searchQuery,
        value: searchQuery,
      }
      if (additionPosition === 'top') filteredOptions.unshift(addItem)
      else filteredOptions.push(addItem)
    }

    return filteredOptions
  }
}
