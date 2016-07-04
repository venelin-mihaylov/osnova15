"use strict"
import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import EntityFormWrapper from "components/EntityFormWrapper"
import MatchFormFields from "modules/match/components/MatchFormFields"
import OsnovaFormContainer from 'components/OsnovaFormContainer'
import CRUDAct from 'constants/CRUDAct'
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
            dispatch(actions.change(formModelField(this.constructor.entity, fk.foreignKey), recordFK.id))
            dispatch(actions.change(formModelField(this.constructor.entity, fk.relationOne), recordFK))
          }
          if(fk.relationType == 'many') {
            let r = {}
            r[fk.foreignKey] = recordFK.id
            if(fk.relationOne) {
              r[fk.relationOne] = recordFK
            }
            dispatch(actions.push(formModelField(this.constructor.entity, fk.relationMany), r))
          }
        }
      })
      dispatch(this.act(CRUDAct.SELECT_CREATED_FK_RECORD, false))
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
        const fkEntity = 'competitor'
        // if the user creates a new competitor and returns here, add it to the match competitors *once* (flash)
        dispatch(this.act(CRUDAct.SELECT_CREATED_FK_RECORD, [{
          foreignKey: 'competitorId',
          relationType: 'many',
          relationOne: 'competitor',
          relationMany: 'match_competitor[]',
          propFKRecord: 'createdCompetitor'
        }]))
        // do not load the form on its next mount, *once*, (flash)
        dispatch(this.act(CRUDAct.INIT_FORM, false))
        // set the return uri for the next form
        dispatch({
          type: CRUDAct.prefixType(fkEntity, CRUDAct.SET_NEXT_URI),
          value: toUri([entity, id, action]) // i.e come back here
        })
        // redirect
        dispatch(push(`/${fkEntity}/add`))
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
