import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import MatchCompetitorFormFields from 'modules/matchCompetitor/components/MatchCompetitorFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer'
import CRUDAct from 'constants/CRUDAct'
import {push} from 'react-router-redux'
import {mapAct, mapCrudStateToProps, crudStatePath, selectCreatedFK, rrfSetValid} from 'utils/Util'

const entity = 'matchCompetitor'
const variation = '1'

@connect(mapCrudStateToProps(entity, variation, state => ({
  fkRecord: state[crudStatePath('competitor')].savedRecord
})), mapAct(entity, variation))
@autobind
class MatchCompetitorFormContainer extends OsnovaFormContainer {

  postLoadModel(record) {
    rrfSetValid({
      dispatch: this.props.dispatch,
      entity: this.props.entity,
      record
    })
  }

  componentWillMount() {
    super.componentWillMount()

    selectCreatedFK({
      dispatch: this.props.dispatch,
      entity: this.props.entity,
      variation: this.props.variation,
      select: this.props.redux.selectCreatedFK,
      fkParams: [{
        fkEntity: 'competitor',
        fkRecord: this.props.fkRecord,
        fkFieldName: 'competitorId',
        relationType: 'belongsToOne'
      }]
    })
  }
  onSubmit(record) {
    super.onSubmit({
      ...record,
      matchId: this.props.params.matchId,
    })
  }

  render() {
    const {
      dispatch,
      location: {pathname}
    } = this.props
    return (<EntityFormWrapper
      FormFieldsComponent={MatchCompetitorFormFields}
      {...this.props}
      {...(this.addProps())}
      onClickAddCompetitor={(e) => {
        e.preventDefault()
        this.props.act(CRUDAct.RESET_FORM, false)
        this.props.act(CRUDAct.SELECT_CREATED_FK_RECORD, true)
        dispatch(push(`${pathname}/create-competitor`))
      }}
    />)
  }
}
export default MatchCompetitorFormContainer
