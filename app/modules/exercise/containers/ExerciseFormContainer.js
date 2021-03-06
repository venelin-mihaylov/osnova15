import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import ExerciseFormFields from 'modules/exercise/components/ExerciseFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer.js'
import CRUDAct from 'constants/CRUDAct'
import {push} from 'react-router-redux'
import {mapAct, mapCrudStateToProps, selectCreatedFK, crudStatePath, rrfModel, rrfField, rrfSetValid2} from 'utils/Util'
import ExerciseSchema from '../../../../universal/model/schema/ExerciseSchema'
import get from 'lodash/get'
import {actions} from 'react-redux-form'

const entity = 'exercise'
const variation = '1'

/*
 RANGE:
 WEAPON:
 AMMO:
 SHOOTING POSITION:
 TARGET:
 START/SIGNAL:
 DESCRIPTION:
 TIME:
 SCORING:
 */

@connect(mapCrudStateToProps(entity, variation, state => ({
  fkRecord: state[crudStatePath('target')].savedRecord,
  model: get(state, rrfModel(entity)),
})), mapAct(entity, variation))
@autobind
class ExerciseFormContainer extends OsnovaFormContainer {

  static DEFAULT_BRIEFING = `RANGE: 
WEAPON: 
AMMO: 
SHOOTING POSITION: 
TARGET:
START/SIGNAL:
DESCRIPTION: 
TIME: 
SCORING:`

  componentWillMount() {
    super.componentWillMount()

    selectCreatedFK({
      dispatch: this.props.dispatch,
      entity: this.props.entity,
      variation: this.props.variation,
      select: this.props.redux.selectCreatedFK,
      fkParams: [{
        fkEntity: 'target',
        fkRecord: this.props.fkRecord,
        fkFieldName: this.props.redux.selectCreatedFK ? this.props.redux.selectCreatedFK.fkFieldName : null,
        relationType: 'belongsToOne'
      }]
    })
  }

  /**
   * IN MATCH set MatchId, otherwise set favourite: true
   * @param record
   */
  onSubmit(record) {
    if (this.props.params.matchId) {
      super.onSubmit({
        ...record,
        matchId: this.props.params.matchId,
      })
    } else {
      super.onSubmit({
        ...record,
        favourite: true
      })
    }
  }

  onAddRecord() {
    this.props.dispatch(actions.change(rrfField(entity, 'briefing'), ExerciseFormContainer.DEFAULT_BRIEFING))
  }

  postLoadModel() {
    rrfSetValid2({
      dispatch: this.props.dispatch,
      entity: this.props.entity,
      schema: ExerciseSchema,
    })
  }

  render() {
    const {
      dispatch,
      location: {pathname}
    } = this.props

    return (<EntityFormWrapper
      FormFieldsComponent={ExerciseFormFields}
      {...this.props}
      {...(this.addProps())}
      onClickAddTarget={fkFieldName => (e) => {
        e.preventDefault()
        this.props.act(CRUDAct.RESET_FORM, false)
        this.props.act(CRUDAct.SELECT_CREATED_FK_RECORD, {value: {fkFieldName}})
        dispatch(push(`${pathname}/create-target`))
      }}
    />)
  }
}
export default ExerciseFormContainer
