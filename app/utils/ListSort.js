import React from 'react'
import CRUDAct from 'constants/CRUDAct'

export default class ListSort {

  static sort(act, sortBy, curSortDirection) {
    const sortDirection = ListSort.nextSortDirection(curSortDirection)
    act(CRUDAct.LIST_SET_SORT, {
      sortDirection,
      sortBy: sortDirection ? sortBy : null,
    })
    act(CRUDAct.LIST_REQUESTED)
  }

  static fieldSortDirection(fieldName, sortBy, sortDirection) {
    if (fieldName === sortBy) {
      return sortDirection
    }
    return null
  }

  static nextSortDirection(curSortDirection) {
    if (!curSortDirection) {
      return 'asc'
    }
    if (curSortDirection === 'asc') {
      return 'desc'
    }
    if (curSortDirection === 'desc') {
      return null
    }

    return null
  }

  static renderSortThumbnail(fieldName, sortBy, sortDirection) {
    const direction = ListSort.fieldSortDirection(fieldName, sortBy, sortDirection)
    if (direction === 'asc') {
      return <span>v</span>
    }
    if (direction === 'desc') {
      return <span>^</span>
    }
    return <span>&nbsp;</span>
  }

  static sortHeader(act, sortBy, sortDirection, fieldName, header = fieldName) {
    const onClick = () => ListSort.sort(act, fieldName, sortDirection)
    const thumb = ListSort.renderSortThumbnail(fieldName, sortBy, sortDirection)
    return <div onClick={onClick}>{thumb}&nbsp;{header}</div>
  }
}
