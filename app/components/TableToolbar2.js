import React from 'react'
import {Grid, Button, Icon} from 'stardust'
import classNames from 'classnames'

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
    selectedId: React.PropTypes.number
  }

  render() {
    const {
      toolbarTitle,
      onAddClick,
      onEditClick,
      onDeleteClick,
      limit,
      onLimitChange,
      selectedId,
      onRefresh,
      appendButtons = []
    } = this.props

    const ret = (<Grid style={{marginBottom: 5, marginTop: 5}}>
      <Grid.Column key={1} width={13}>
        <Button
          className={classNames({
            positive: true,
            icon: true,
            labeled: true,
          })}
          onClick={onAddClick}
        >
          <Icon name='add' />
          Add
        </Button>
        <Button
          className={classNames({
            icon: true,
            labeled: true,
            disabled: !selectedId
          })}
          onClick={onEditClick}
        >
          <Icon name='edit' />
          Edit
        </Button>
        <Button
          className={classNames({
            negative: true,
            icon: true,
            labeled: true,
            disabled: !selectedId
          })}
          onClick={onDeleteClick}
        >
          <Icon name='erase' />
          Delete
        </Button>
        {appendButtons && appendButtons}
      </Grid.Column>
      <Grid.Column width={2}>
        <div style={{paddingTop: 8}}>{toolbarTitle}</div>
      </Grid.Column>
      <Grid.Column width={1}>
        <Button className='icon' onClick={onRefresh}>
          <Icon className='repeat' />
        </Button>
      </Grid.Column>
    </Grid>)

    return ret
  }
}

export default TableToolbar2
