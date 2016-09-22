import React from 'react'
import ItoNFieldSet from 'components/ItoNFieldSet'
import AutoFields from 'components/AutoFields'
import {Form, Icon, Button} from 'stardust'
import ExerciseSchema from '../../../../universal/model/schema/ExerciseSchema'
import ExerciseTargetSchema from '../../../../universal/model/schema/ExerciseTargetSchema'
import ExerciseTargetRelations from '../../../../universal/model/relations/ExerciseTargetRelations'
import {Input} from 'stardust'

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
      renderRecord={({row, idx, relName, onDeleteByIndex}) => (
        <Form.Group key={idx}>
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
                buttons: <Button className='icon' onClick={onClickAddTarget(`${relName}[${idx}]targetId`)}><Icon name='add' /></Button>,
              },
              exerciseId: {
                exclude: true
              }
            }
          })}
        </Form.Group>
      )}
    />
  </div>)
}

ExerciseFormFields.propTypes = {
  dispatch: React.PropTypes.func,
  model: React.PropTypes.string,
  entity: React.PropTypes.string,
  onClickAddTarget: React.PropTypes.func
}

export default ExerciseFormFields
