import React from 'react'
import {Dropdown, Icon, Button} from 'semantic-ui-react'

const ListLimitMenu = ({limit, onLimitChange}) => (<Dropdown
  value={limit}
  onChange={onLimitChange}
  icon={null}
  options={[2, 5, 10, 100, 1000].map(v => ({text: v, value: v}))}
  trigger={<Button className='basic icon'><Icon name='toggle down' size='large' /></Button>}
/>)

ListLimitMenu.propTypes = {
  onLimitChange: React.PropTypes.func.isRequired,
  limit: React.PropTypes.number.isRequired
}

export default ListLimitMenu
