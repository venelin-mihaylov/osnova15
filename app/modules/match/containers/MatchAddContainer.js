"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityAdd from "components/EntityAdd"
import MatchFormFields from "modules/match/components/MatchFormFields"
import AddContainerHOC from 'hoc/AddContainerHOC'

@connect(state => ({
  redux: state.match,
  form: state.matchForm,
  model: state.matchModel
}))
@autobind
@AddContainerHOC({
  entity: 'match'
})
class MatchAddContainer extends React.Component {

  render() {
    return (<EntityAdd
      FormFieldsComponent={MatchFormFields}
      {...this.props}
    />)
  }
}
export default MatchAddContainer

