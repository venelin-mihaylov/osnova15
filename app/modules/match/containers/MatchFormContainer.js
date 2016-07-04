"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityFormWrapper from "components/EntityFormWrapper"
import MatchFormFields from "modules/match/components/MatchFormFields"
import OsnovaFormContainer from 'components/OsnovaFormContainer'
import CRUDActionType from 'constants/CRUDActionType'
import ActionType from 'constants/ActionType'
import {push} from 'react-router-redux'
import {actions} from 'react-redux-form'
import {toUri, formModelField} from 'utils/Util'



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

  onAddCreatedCompetitor() {
    const {
      dispatch,
        redux: {
        selectCreatedFK
      },
    } = this.props

    if (selectCreatedFK) {
      selectCreatedFK.forEach(fk => {
        const recordFK = this.props[fk.propFKRecord]
        if(recordFK) {
          if(fk.relationType == 'one') {


          }
          if(fk.relationType == 'many') {
            let r = {}
            r[fk.relationOne] = recordFK
            r[fk.field] = recordFK.id
            dispatch(actions.push(formModelField(this.constructor.entity, fk.relationMany), r))
          }

        }
      })

      const record = this.props.createdCompetitor

      this.props.dispatch(this.act(CRUDActionType.SELECT_CREATED_FK_RECORD, null))
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
        // if the user creates a new competitor and returns here, add it to the match competitors *once* (flash)
        dispatch(this.act(CRUDActionType.SELECT_CREATED_FK_RECORD, {
          value: {
            competitorId: 'competitor'
          }
        }))
        // do not load the form on its next mount, *once*, (flash)
        dispatch(this.act(CRUDActionType.INIT_FORM, {value: false}))
        dispatch({
          type: CRUDActionType.prefixType('competitor', CRUDActionType.SET_NEXT_URI),
          nextUri: toUri(entity, id, action) // i.e come back here
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
export default MatchFormContainer
