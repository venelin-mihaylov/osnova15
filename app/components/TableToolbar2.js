import React from 'react'
import {Grid, Button, Icon} from 'stardust'

class TableToolbar2 extends React.Component {

  static defaultProps = {
    onAddClick: () => {
    },
    onEditClick: () => {
    },
    onDeleteClick: () => {
    },
    onLimitChange: () => {
    },
    limit: 100,
    toolbarTitle: 'List',
  }

  static propTypes = {
    onAddClick: React.PropTypes.func,
    onEditClick: React.PropTypes.func,
    onDeleteClick: React.PropTypes.func,
    onLimitChange: React.PropTypes.func,
    onRefresh: React.PropTypes.func,
    limit: React.PropTypes.number,
    toolbarTitle: React.PropTypes.string,
    appendButtons: React.PropTypes.any,
    listSelectedId: React.PropTypes.number
  }

  render() {
    const {
      toolbarTitle,
      onAddClick,
      onEditClick,
      onDeleteClick,
      limit,
      onLimitChange,
      listSelectedId,
      onRefresh,
      appendButtons = []
    } = this.props

    const ret = (<Grid>
      <Grid.Column key={1} width={13}>
        <Button className='positive' onClick={onAddClick} ><Icon name='add'/>Add</Button>
        <Button className='secondary' onClick={onEditClick}><Icon name='edit'/>Edit</Button>
        <Button className='negative' onClick={onDeleteClick}><Icon name='erase'/>Delete</Button>
        {appendButtons.length > 0 && appendButtons}
      </Grid.Column>
      <Grid.Column width={2}><div style={{paddingTop: 8}}>{toolbarTitle}</div></Grid.Column>
      <Grid.Column width={1}>
        <Button className='icon' onClick={onRefresh}>
          <Icon className='repeat'/>
        </Button>
      </Grid.Column>
    </Grid>)

    return ret
  }
}

export default TableToolbar2
