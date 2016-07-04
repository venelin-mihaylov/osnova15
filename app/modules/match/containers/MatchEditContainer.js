"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityEdit from "components/EntityEdit"
import MatchFormFields from "modules/match/components/MatchFormFields"
import OsnovaEditContainer from 'components/OsnovaEditContainer'
import CRUDActionType from 'constants/CRUDActionType'
import ActionType from 'constants/ActionType'
import {push} from 'react-router-redux'
import {actions} from 'react-redux-form'
import {formModelField} from 'utils/Util'


@connect(state => ({
  redux: state.match,
  form: state.matchForm,
  model: state.matchModel,
  misc: state.misc,
  createdCompetitor: state.competitor.savedRecord
}))
@autobind
class MatchEditContainer extends OsnovaEditContainer {

  static entity = 'match'

  onAddCreatedCompetitor() {
    if (this.props.misc.matchAddCreatedCompetitor) {
      const record = this.props.createdCompetitor
      this.props.dispatch(actions.push(formModelField(this.constructor.entity, 'match_competitor[]'), {
        competitorId: record.id,
        competitor: record
      }))
      this.props.dispatch({type: ActionType.MATCH_ADD_CREATED_COMPETITOR, value: false})
    }
  }

  componentWillMount() {
    super.componentWillMount()
    this.onAddCreatedCompetitor()
  }

  render() {
    const {
      dispatch,
      model: {
        match_competitor = []
      },
      params: {
        id
      }
    } = this.props
    const entity = this.constructor.entity


    return (<EntityEdit
      FormFieldsComponent={MatchFormFields}
      {...this.props}
      {...(this.addProps())}
      onClickAddCompetitor={() => {
        // if the user creates a new competitor and returns here, add it to the match competitors *once* (flash)
        dispatch({type: ActionType.MATCH_ADD_CREATED_COMPETITOR, value: true})
        // do not load the form on its next mount, *once*, (flash)
        dispatch(this.act(CRUDActionType.INIT_FORM, {value: false}))
        dispatch({
          type: CRUDActionType.prefixType('competitor', CRUDActionType.SET_NEXT_URI),
          nextUri: `/match/${id}/edit`
        })
        dispatch(push('/competitor/add'))
      }}
      onSelectCompetitor={(id, record) => {
        if (match_competitor.find(r => r.competitorId === record.id)) return
        dispatch(actions.push(formModelField(entity, 'match_competitor[]'), {
          competitorId: record.id,
          competitor: record
        }))
      }}
    />)
  }
}
export default MatchEditContainer
