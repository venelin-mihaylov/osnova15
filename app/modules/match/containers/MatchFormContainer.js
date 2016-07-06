"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityFormWrapper from "components/EntityFormWrapper"
import MatchFormFields from "modules/match/components/MatchFormFields"
import OsnovaFormContainer from 'components/OsnovaFormContainer'
import {actions} from 'react-redux-form'
import {toUri, rrfField, navigateToCreateFKRecordAndScheduleSelect, doSelectCreatedFK} from 'utils/Util'

@connect(state => ({
  redux: state.match,
  form: state.matchForm,
  model: state.matchModel,
  misc: state.misc,
  createdCompetitor: state.competitor.savedRecord
}))
@autobind
class MatchFormContainer extends OsnovaFormContainer {

  static entity = 'match'

  componentWillMount() {
    super.componentWillMount()

    doSelectCreatedFK({
      dispatch: this.props.dispatch,
      entity: this.constructor.entity,
      selectCreatedFK: this.props.redux.selectCreatedFK,
      createdCompetitor: this.props.createdCompetitor
    })
  }

  render() {
    const {
      dispatch,
      model: {
        match_competitor = []
      },
      params: {
        id,
        action
      }
    } = this.props
    const entity = this.constructor.entity

    return (<EntityFormWrapper
      FormFieldsComponent={MatchFormFields}
      {...this.props}
      {...(this.addProps())}
      onClickAddCompetitor={() => {
        const fkEntity = 'competitor'
        navigateToCreateFKRecordAndScheduleSelect({
          dispatch,
          entity,
          fkEntity,
          thisUri: toUri(entity, id, action),
          nextUri: `/${fkEntity}/add`,
          scheduleSelect: [{
            foreignKey: 'competitorId',
            relationType: 'many',
            relationOne: 'competitor',
            relationMany: 'match_competitor[]',
            propFKRecord: 'createdCompetitor'
          }]
        })
      }}
      onSelectCompetitor={(id, record) => {
        if (match_competitor.find(r => r.competitorId === record.id)) return
        dispatch(actions.push(rrfField(entity, 'match_competitor[]'), {
          competitorId: record.id,
          competitor: record
        }))
      }}
    />)
  }
}
export default MatchFormContainer
