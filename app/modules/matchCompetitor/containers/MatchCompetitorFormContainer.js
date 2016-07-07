"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityFormWrapper from "components/EntityFormWrapper"
import MatchCompetitorFormFields from "modules/matchCompetitor/components/MatchCompetitorFormFields"
import OsnovaFormContainer from 'components/OsnovaFormContainer'
import {toUri, navigateToCreateFKRecordAndScheduleSelect, doSelectCreatedFK} from 'utils/Util'

@connect(state => ({
  redux: state.matchCompetitor,
  model: state.matchCompetitorModel,
  form: state.matchCompetitorForm,
  createdCompetitor: state.competitor.savedRecord
}))
@autobind
class MatchCompetitorFormContainer extends OsnovaFormContainer {

  static entity = 'matchCompetitor'

  componentWillMount() {
    super.componentWillMount()

    doSelectCreatedFK({
      dispatch: this.props.dispatch,
      entity: this.constructor.entity,
      selectCreatedFK: this.props.redux.selectCreatedFK,
      createdCompetitor: this.props.createdCompetitor
    })
  }

  onCreate(record) {
    super.onCreate({
      matchId: this.props.params.matchId,
      ...record
    })
  }

  onUpdate(record) {
    super.onUpdate({
      matchId: this.props.params.matchId,
      ...record
    })
  }

  render() {
    const {
      dispatch,
      params: {matchId},
      route: {action}
    } = this.props
    const entity = this.constructor.entity

    return (<EntityFormWrapper
      FormFieldsComponent={MatchCompetitorFormFields}
      {...this.props}
      {...(this.addProps())}
      onClickAddCompetitor={() => {
        const fkEntity = 'competitor'
        navigateToCreateFKRecordAndScheduleSelect({
          dispatch,
          entity,
          fkEntity,
          nextUri: toUri('match', matchId, 'competitor', action, 'create-competitor'),
          scheduleSelect: [{
            fkEntity,
            foreignKey: 'competitorId',
            relationType: 'one',
            relationOne: 'competitor',
            propFKRecord: 'createdCompetitor',
          }]
        })
      }}

    />)
  }
}
export default MatchCompetitorFormContainer
