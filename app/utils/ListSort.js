import React from 'react'
import CRUDAct from 'constants/CRUDAct'

export default class ListSort {

  static sort(act, orderBy, curorderDirection) {
    const orderDirection = ListSort.nextorderDirection(curorderDirection)
    act(CRUDAct.LIST_SET_SORT, {
      orderDirection,
      orderBy: orderDirection ? orderBy : null,
    })
    act(CRUDAct.LIST_REQUESTED)
  }

  static fieldorderDirection(fieldName, orderBy, orderDirection) {
    if (fieldName === orderBy) {
      return orderDirection
    }
    return null
  }

  static nextorderDirection(curorderDirection) {
    if (!curorderDirection) {
      return 'asc'
    }
    if (curorderDirection === 'asc') {
      return 'desc'
    }
    if (curorderDirection === 'desc') {
      return null
    }

    return null
  }

  static sortThumbnail(fieldName, orderBy, orderDirection) {
    const direction = ListSort.fieldorderDirection(fieldName, orderBy, orderDirection)
    if (direction === 'asc') {
      return <span>v</span>
    }
    if (direction === 'desc') {
      return <span>^</span>
    }
    return <span>&nbsp;</span>
  }

  static sortable(act, curOrderBy, curOrderDirection) {
    return (label, {property}) => ({
      onClick: () => ListSort.sort(act, property, curOrderDirection),
      children: (<span>
        {ListSort.sortThumbnail(property, curOrderBy, curOrderDirection)}
        &nbsp;
        {label}
      </span>)
    })
  }
}
