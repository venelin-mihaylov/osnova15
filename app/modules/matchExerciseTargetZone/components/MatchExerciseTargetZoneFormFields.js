import React from 'react'
import AutoFields from 'components/AutoFields'
import {Form, Label, Segment, Step} from 'stardust'
import MatchExerciseTargetZoneSchema from '../../../../universal/model/schema/MatchExerciseTargetZoneSchema'

export const MatchExerciseTargetZoneFormFields = ({
  dispatch,
  model,
  entity,
}) => (<div>
  {model && model.map((r, idx) => (<Form.Group key={`group-${idx}`}>
    <Segment>{r.targetName} - {r.zoneName}</Segment>
    {AutoFields.renderFields({
      entity,
      namePrefix: `[${idx}].`,
      include: ['weight', 'score'],
      label: null,
      style: {
        paddingTop: 7
      },
      jsonSchema: MatchExerciseTargetZoneSchema
    })}
  </Form.Group>))}
</div>)

MatchExerciseTargetZoneFormFields.propTypes = {
  dispatch: React.PropTypes.func,
  model: React.PropTypes.any,
  entity: React.PropTypes.string,
  onClickAddTarget: React.PropTypes.func
}

export default MatchExerciseTargetZoneFormFields
