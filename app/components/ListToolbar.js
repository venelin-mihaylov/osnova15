import React from 'react'
import {Grid, Button, Icon, Container, Segment, Menu, Dropdown} from 'semantic-ui-react'
import TablePagination from 'components/TablePagination'
import ListLimitMenu from 'components/ListLimitMenu'
import cx from 'classnames'
import FilterBar from 'components/FilterBar'
import ActiveFiltersList from 'components/ActiveFiltersList'


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
      isVisibleSearch: false
    })
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

    return (<div>
      <Menu style={{marginBottom: 2}}>
        <Menu.Menu position='left' icon='labeled'>
          <Menu.Item icon='add' content='Add' onClick={onAddClick} />
          <Menu.Item icon='edit' className={cx({disabled: !selectedId})} content='Edit' onClick={onEditClick} />
          <Menu.Item icon='erase' className={cx({disabled: !selectedId})} content='Erase' onClick={onDeleteClick} />
          {filterSchema && <Menu.Item icon='search' content='Search' onClick={() => this.setState({isVisibleSearch: !this.state.isVisibleSearch})} />}
        </Menu.Menu>

        <Menu.Menu position='right'>
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
          <Grid.Column width={9}>
            <FilterBar addListFilter={addListFilter} filterSchema={filterSchema} />
          </Grid.Column>
          <Grid.Column width={7}>
            <ActiveFiltersList activeFilters={filter} removeListFilter={removeListFilter} filterSchema={filterSchema} />
          </Grid.Column>
        </Grid.Row>
      </Grid>}
    </div>)
  }
}

export default ListToolbar