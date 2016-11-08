import React from 'react'
import TableToolbar2 from 'components/TableToolbar2'
import BaseTable from 'components/BaseTable'
import GlobalError from 'components/GlobalError'
import {Loader, Segment} from 'semantic-ui-react'
import FilterBar from 'components/FilterBar'
import ActiveFiltersList from 'components/ActiveFiltersList'
import cx from 'classnames'

const EntityList = ({
  columns,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onLimitChange,
  onNextPage,
  onPrevPage,
  onRefresh,
  onSelectRow,
  toolbarShow,
  toolbarTitle,
  toolbarProps = {},
  addListFilter,
  removeListFilter,
  filterSchema,
  redux, // eslint-disable-line no-unused-vars
  redux: {
    records,
    selectedId,
    globalError,
    page,
    limit,
    filter,
    loading,
  }
}) => (<Segment basic>
  <div
    className={cx({
      ui: true,
      inverted: true,
      dimmer: true,
      active: loading
    })}
  >
    <Loader size='huge'>Loading</Loader>
  </div>
  <If condition={toolbarShow}>
    <TableToolbar2
      {...{
        toolbarTitle,
        selectedId,
        onAddClick,
        onEditClick,
        onDeleteClick,
        onRefresh,
        limit,
        onLimitChange,
        loading,
        page,
        onNextPage,
        onPrevPage,
      }}
      {...toolbarProps}
    />
  </If>
  <GlobalError globalError={globalError} />
  <FilterBar addListFilter={addListFilter} filterSchema={filterSchema} />
  <ActiveFiltersList activeFilters={filter} removeListFilter={removeListFilter} filterSchema={filterSchema} />
  <BaseTable
    rows={records}
    selectedRowId={selectedId}
    columns={columns}
    onSelectRow={onSelectRow}
  />
</Segment>)

EntityList.propTypes = {
  columns: React.PropTypes.any.isRequired,
  redux: React.PropTypes.any.isRequired,
  onAddClick: React.PropTypes.func,
  onEditClick: React.PropTypes.func,
  onDeleteClick: React.PropTypes.func,
  onLimitChange: React.PropTypes.func,
  addListFilter: React.PropTypes.func,
  removeListFilter: React.PropTypes.func,
  filterSchema: React.PropTypes.object,
  page: React.PropTypes.number,
  onNextPage: React.PropTypes.func,
  onPrevPage: React.PropTypes.func,
  onRefresh: React.PropTypes.func,
  onSelectRow: React.PropTypes.func,
  toolbarTitle: React.PropTypes.string.isRequired,
  toolbarShow: React.PropTypes.bool,
  toolbarProps: React.PropTypes.any,
}

EntityList.defaultProps = {
  toolbarShow: true
}

export default EntityList

