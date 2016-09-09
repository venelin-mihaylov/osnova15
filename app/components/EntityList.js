import React from 'react'
import TablePagination from 'components/TablePagination'
import TableToolbar2 from 'components/TableToolbar2'
import BaseTable from 'components/BaseTable'
import GlobalError from 'components/GlobalError'

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
  redux, // eslint-disable-line no-unused-vars
  redux: {
    records,
    selectedId,
    globalError,
    page,
    limit,
  }
}) => (<div>
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
        page,
        onNextPage,
        onPrevPage,
      }}
      {...toolbarProps}
    />
  </If>
  <GlobalError globalError={globalError} />
  <BaseTable
    rows={records}
    selectedRowId={selectedId}
    columns={columns}
    onSelectRow={onSelectRow}
  />
</div>)

EntityList.propTypes = {
  columns: React.PropTypes.any.isRequired,
  redux: React.PropTypes.any.isRequired,
  onAddClick: React.PropTypes.func,
  onEditClick: React.PropTypes.func,
  onDeleteClick: React.PropTypes.func,
  onLimitChange: React.PropTypes.func,
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

