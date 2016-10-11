import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import EntityFormWrapper from 'components/EntityFormWrapper'
import MatchFormFields from 'modules/match/components/MatchFormFields'
import OsnovaFormContainer from 'components/OsnovaFormContainer'
import {mapAct, mapCrudStateToProps, rrfSetValid} from 'utils/Util'

const entity = 'match'
const variation = '1'

@connect(mapCrudStateToProps(entity, variation), mapAct(entity, variation))
@autobind
class MatchFormContainer extends OsnovaFormContainer {

  postLoadModel(record) {
    rrfSetValid({
      dispatch: this.props.dispatch,
      entity: this.props.entity,
      record
    })
  }

  render() {
    return (<EntityFormWrapper
      FormFieldsComponent={MatchFormFields}
      {...this.props}
      {...(this.addProps())}
      loadDummyData={() => {
        this.loadModel({
          name: 'test',
          type: 1,
          discipline: 2,
          country: 'bg'
        })
      }}
    />)
  }
}
export default MatchFormContainer
