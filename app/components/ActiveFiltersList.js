import React from 'react'
import {List, Button} from 'semantic-ui-react'
import noop from 'lodash/noop'

const ActiveFiltersList = ({activeFilters, removeListFilter, filterSchema}) => {
  if (!filterSchema || !activeFilters) {
    return null
  }
  return (<List>
    {Object.keys(activeFilters).map(f => (<List.Item key={f} verticalAlign='middle'>
      <List.Content floated='left'>
        <Button basic icon='erase' onClick={() => removeListFilter(f)} />
      </List.Content>
      <List.Content floated='left' style={{marginTop: '10'}}>
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
