import React from 'react'
import {List, Button} from 'semantic-ui-react'
import noop from 'lodash/noop'

const ActiveFiltersList = ({activeFilters, removeListFilter, filterSchema}) => {
  if (!filterSchema || !activeFilters) {
    return null
  }
  return (<List
    divided
    verticalAlign='middle'
  >
    {Object.keys(activeFilters).map(f => (<List.Item>
      <List.Content floated='left'>
        <Button icon='erase' onClick={() => removeListFilter(f)} />
      </List.Content>
      <List.Content>
        {f} {activeFilters[f].operator} {activeFilters[f].value}
      </List.Content>
    </List.Item>))}
  </List>)
}

ActiveFiltersList.propTypes = {
  removeListFilter: React.PropTypes.func,
  activeFilters: React.PropTypes.object,
  filterSchema: React.PropTypes.object
}

ActiveFiltersList.defaultProps = {
  removeListFilter: noop
}

export default ActiveFiltersList
