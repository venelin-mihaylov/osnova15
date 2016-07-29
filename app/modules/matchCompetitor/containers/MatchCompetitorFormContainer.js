"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityFormWrapper from "components/EntityFormWrapper"
import MatchCompetitorFormFields from "modules/matchCompetitor/components/MatchCompetitorFormFields"
import OsnovaFormContainer from 'components/OsnovaFormContainer'
import {selectCreatedFK} from 'utils/Util'
import CRUDAct from 'constants/CRUDAct'
import {push} from 'react-router-redux'

@connect(state => ({
  redux: state.matchCompetitor,
  model: state.matchCompetitorModel,
  form: state.matchCompetitorForm,
  fkRecord: state.competitor.savedRecord
}))
@autobind
class MatchCompetitorFormContainer extends OsnovaFormContainer {

  static entity = 'matchCompetitor'

  componentWillMount() {
    super.componentWillMount()

    selectCreatedFK({
      dispatch: this.props.dispatch,
      entity: this.constructor.entity,
      select: this.props.redux.selectCreatedFK,
      fkParams: [{
        fkEntity: 'competitor',
        fkRecord: this.props.fkRecord,
        fkFieldName: 'competitorId',
        relationType: 'belongsToOne'
      }]
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
      location: {pathname}
    } = this.props
    return <EntityFormWrapper
      FormFieldsComponent={MatchCompetitorFormFields}
      {...this.props}
      {...(this.addProps())}
      onClickAddCompetitor={() => {
        dispatch(this.act(CRUDAct.RESET_FORM, false))
        dispatch(this.act(CRUDAct.SELECT_CREATED_FK_RECORD, true))
        dispatch(push(`${pathname}/create-competitor`))
      }}
    />
  }
}
export default MatchCompetitorFormContainer
