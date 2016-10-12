import React from 'react'
import AutoFields from 'components/AutoFields'
import {Form, Segment} from 'semantic-ui-react'
import ExerciseTargetZoneSchema from '../../../../universal/model/schema/ExerciseTargetZoneSchema'

export const ExerciseTargetZoneFormFields = ({
  model,
  entity,
}) => (<div>
  {model && model.map((r, idx) => (<Form.Group key={`group-${idx}`}>
    <Segment>{r.targetName} - {r.zoneName}</Segment>
    {AutoFields.renderFields({
      entity,
      jsonSchema: ExerciseTargetZoneSchema,
      namePrefix: `[${idx}].`,
      include: ['weight', 'score'],
      label: null,
      style: {
        paddingTop: 7
      },
      overrides: {
        weight: {
          rrfProps: {
            updateOn: 'change'
          }
        }
      },
    })}
  </Form.Group>))}
</div>)

ExerciseTargetZoneFormFields.propTypes = {
  dispatch: React.PropTypes.func,
  model: React.PropTypes.any,
  entity: React.PropTypes.string,
  onClickAddTarget: React.PropTypes.func
}

export default ExerciseTargetZoneFormFields
