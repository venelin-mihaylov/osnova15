import React from 'react'
import {Grid, Button, Modal, Menu, Icon, Dropdown} from 'semantic-ui-react'
import cx from 'classnames'
import FilterBar from 'components/FilterBar'
import ActiveFiltersList from 'components/ActiveFiltersList'
import isEmpty from 'lodash/isEmpty'


class ListToolbar extends React.Component {

  static propTypes = {
    toolbarTitle: React.PropTypes.string,
    selectedId: React.PropTypes.number,
    onAddClick: React.PropTypes.func,
    onEditClick: React.PropTypes.func,
    onDeleteClick: React.PropTypes.func,
    onRefresh: React.PropTypes.func,
    loading: React.PropTypes.bool,
    limit: React.PropTypes.number,
    onLimitChange: React.PropTypes.func,
    page: React.PropTypes.number,
    onNextPage: React.PropTypes.func,
    onPrevPage: React.PropTypes.func,
    appendButtons: React.PropTypes.any,
    addListFilter: React.PropTypes.func,
    removeListFilter: React.PropTypes.func,
    filterSchema: React.PropTypes.object,
  }

  static defaultProps = {
    onAddClick: () => null,
    onEditClick: () => null,
    onDeleteClick: () => null,
    onLimitChange: () => null,
    toolbarTitle: 'List',
  }

  componentWillMount() {
    this.setState({
      isVisibleSearch: false,
      isVisibleModalDelete: false,
    })
  }

  hideModalDelete() {
    this.setState({isVisibleModalDelete: false})
  }
  showModalDelete() {
    this.setState({isVisibleModalDelete: true})
  }
  toggleSearchPanel() {
    this.setState({isVisibleSearch: !this.state.isVisibleSearch})
  }

  render() {
    const {
      toolbarTitle,
      selectedId,
      onAddClick,
      onEditClick,
      onDeleteClick,
      onRefresh,
      loading,
      limit,
      onLimitChange,
      page,
      onNextPage,
      onPrevPage,
      appendButtons = [],
      addListFilter,
      removeListFilter,
      filterSchema,
      filter,
    } = this.props

    const isFilterApplied = !isEmpty(filter)

    return (<div>

      {this.state.isVisibleModalDelete && <Modal dimmer='blurring' size='small' open onClose={() => this.hideModalDelete()}>
        <Modal.Header>
          Are you sure?
        </Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete the selected record?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative icon='undo' content='Cancel' onClick={() => this.hideModalDelete()} />
          <Button
            positive
            icon='checkmark'
            content='Confirm'
            onClick={(...args) => {
              this.hideModalDelete()
              onDeleteClick(...args)
            }}
          />
        </Modal.Actions>
      </Modal>}

      <Menu style={{marginBottom: 2}}>
        <Menu.Menu position='left' icon='labeled'>
          <Menu.Item icon='add' content='Add' onClick={onAddClick} />
          <Menu.Item icon='edit' className={cx({disabled: !selectedId})} content='Edit' onClick={onEditClick} />
          <Menu.Item icon='erase' className={cx({disabled: !selectedId})} content='Erase' onClick={() => this.showModalDelete()} />
          {appendButtons && appendButtons}
        </Menu.Menu>

        <Menu.Menu position='right'>
          {filterSchema && <Menu.Item icon={<Icon name='filter' color={isFilterApplied ? 'red' : 'black'} />} onClick={() => this.toggleSearchPanel()} />}
          <Dropdown as={Menu.Item} icon='toggle down'>
            <Dropdown.Menu>
              {[2, 5, 10, 100, 1000].map(v => (<Dropdown.Item onClick={() => onLimitChange(null, v)}>{v}</Dropdown.Item>))}
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item icon='angle left' onClick={onPrevPage} />
          <Menu.Item name={`Page: ${page}`} />
          <Menu.Item icon='angle right' onClick={onNextPage} />
          <Menu.Item icon='repeat' onClick={onRefresh} />
          <Menu.Item header>{toolbarTitle}</Menu.Item>
        </Menu.Menu>
      </Menu>
      {this.state.isVisibleSearch && <Grid stackable celled style={{marginBottom: 5, marginTop: 5}}>
        <Grid.Row columns={3} style={{padding: 0, margin: 0}}>
          <Grid.Column width={11}>
            <FilterBar addListFilter={addListFilter} filterSchema={filterSchema} />
          </Grid.Column>
          <Grid.Column width={5}>
            <ActiveFiltersList activeFilters={filter} removeListFilter={removeListFilter} filterSchema={filterSchema} />
          </Grid.Column>
        </Grid.Row>
      </Grid>}
    </div>)
  }
}

export default ListToolbar
