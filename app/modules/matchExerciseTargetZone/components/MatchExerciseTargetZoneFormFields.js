import React from 'react'
import ItoNFieldSet from 'components/ItoNFieldSet'
import AutoFields from 'components/AutoFields'
import {Form, Icon, Button, Input} from 'stardust'
import MatchExerciseTargetZoneSchema from '../../../../universal/model/schema/MatchExerciseTargetZoneSchema'

export const MatchExerciseTargetZoneFormFields = ({
  dispatch,
  model,
  entity,
}) => {
  const relName = 'match_exercise_target_zone'

  return (<div>
    <ItoNFieldSet
      {...{entity, model, relName, dispatch}}
      relTitle='Zones'
      renderRecord={({idx}) => (
        <div key={idx}>
          <Form.Group >
            {AutoFields.renderFields({
              entity,
              namePrefix: `${relName}[${idx}]`,
              include: ['weight', 'score'],
              jsonSchema: MatchExerciseTargetZoneSchema,
            })}
          </Form.Group>
        </div>
      )}
    />
  </div>)
}

MatchExerciseTargetZoneFormFields.propTypes = {
  dispatch: React.PropTypes.func,
  model: React.PropTypes.object,
  entity: React.PropTypes.string,
  onClickAddTarget: React.PropTypes.func
}

export default MatchExerciseTargetZoneFormFields

// addState: (state, {name}) => {
//   const path = name.replace('rrf.', 'rrf.forms.') + '.pristine'
//   const path2 = path.replace('targetId', '.targetId')
//   const pristine = get(state, path2)
//   return {pristine}
// },
//   postLoadRecord: ({target_zone}, {props: {pristine}}) => { // eslint-disable-line
//   if (isUndefined(pristine) || pristine) {
//     return
//   }
//   console.log('postLoadRecord')
//   const ff = `${relName}[${idx}]match_exercise_target_zone[]`
//   dispatch(actions.filter(rrfField(entity, ff), () => false))
//   target_zone.forEach(({id: zoneId, targetId, name}) => dispatch(actions.push(rrfField(entity, ff), {
//     zoneId,
//     targetId,
//     name
//   })))
// },