"use strict"
import React from "react"
import {autobind} from "core-decorators"
import {connect} from "react-redux"
import CompetitorList from "modules/match/components/CompetitorList"
import HasSelectionHOC from 'hoc/HasSelectionHOC'
import ListContainerHOC from 'hoc/ListContainerHOC'

@connect(state => ({redux: state.match}))
@autobind
@HasSelectionHOC('redux.listRecords')
@ListContainerHOC('match')
export default class CompetitorListContainer extends React.Component {

  render() {
    const {
      redux: {
        listRecords,
        listLoading,
        listError,
        listLimit
      },
      ...rest
    } = this.props

    return <CompetitorList
      {...{listLoading, listError}}
      dataSource={listRecords}
      toolbarTitle="Competitores"
      limit={listLimit}
      columns={[{
        name: 'id',
        title: 'ИД'
      }, {
        name: 'name',
        title: 'Име'
      }, {
        name: 'tournament_id__name',
        title: 'Състезание'
      }]}
      {...rest}
    />
  }
}