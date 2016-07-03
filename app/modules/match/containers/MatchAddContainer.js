"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityAdd from "components/EntityAdd"
import MatchFormFields from "modules/match/components/MatchFormFields"
import OsnovaAddContainer from 'components/OsnovaAddContainer'

@connect(state => ({
  redux: state.match,
  form: state.matchForm,
  model: state.matchModel,
  misc: state.misc,
  createdCompetitor: state.competitor.savedRecord
}))
@autobind
class MatchAddContainer extends OsnovaAddContainer {

  static entity = 'match'

  componentWillMount() {
    super.componentWillMount()
  }

  render() {

    return (<EntityAdd
      FormFieldsComponent={MatchFormFields}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
export default MatchAddContainer

