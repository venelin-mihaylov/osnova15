import React from 'react'
import ItoNFieldSet from 'components/ItoNFieldSet'
import AutoFields from 'components/AutoFields'
import {Form, Button} from 'semantic-ui-react'
import ExerciseSchema from '../../../../universal/model/schema/ExerciseSchema'
import ExerciseTargetSchema from '../../../../universal/model/schema/ExerciseTargetSchema'
import ExerciseTargetRelations from '../../../../universal/model/relations/ExerciseTargetRelations'
import {newRecord} from 'utils/Util'

import styles from 'styles/components/ExerciseFormFields.css'

export const ExerciseFormFields = ({
  dispatch,
  model,
  entity,
  onClickAddTarget
}) => {
  const relName = 'exercise_target'

  return (<div>
    <AutoFields
      {...{entity, styles}}
      jsonSchema={ExerciseSchema}
    />

    <ItoNFieldSet
      {...{entity, model, relName, dispatch}}
      relTitle='Exercise Targets'
      newRecord={newRecord(ExerciseTargetSchema)}
      renderRecord={({idx}) => (<Form.Group key={idx}>
        {AutoFields.renderFields({
          entity,
          styles,
          namePrefix: `${relName}[${idx}]`,
          jsonSchema: ExerciseTargetSchema,
          relations: ExerciseTargetRelations,
          overrides: {
            distance: {
              style: {
                width: 80
              }
            },
            weight: {
              style: {
                width: 80
              }
            },
            score: {
              style: {
                width: 80
              }
            },
            targetId: {
              listParams: {
                filter: {
                  favourite: true
                }
              },
              buttons: <Button icon='add' onClick={onClickAddTarget(`${relName}[${idx}]targetId`)} />,
            },
            exerciseId: {
              exclude: true
            }
          }
        })}
      </Form.Group>)}
    />
  </div>)
}

ExerciseFormFields.propTypes = {
  dispatch: React.PropTypes.func,
  model: React.PropTypes.object,
  entity: React.PropTypes.string,
  onClickAddTarget: React.PropTypes.func
}

export default ExerciseFormFields
