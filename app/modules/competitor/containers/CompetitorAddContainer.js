"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityAdd from "components/EntityAdd"
import CompetitorForm from "modules/match/components/CompetitorForm"
import AddContainerHOC from 'hoc/AddContainerHOC'

@connect(state => ({
  redux: state.match,
  form: state.matchForm
}))
@autobind
@AddContainerHOC('match')
class CompetitorAddContainer extends React.Component {

  render() {
    return (<EntityAdd
      FormComponent={CompetitorForm}
      {...this.props}
    />)
  }
}
export default CompetitorAddContainer

