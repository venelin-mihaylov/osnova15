import React from 'react'
import ItoNFieldSet from 'components/ItoNFieldSet'
import AutoFields from 'components/AutoFields'
import {Form} from 'stardust'
import ExerciseSchema from '../../../../universal/model/schema/ExerciseSchema'
import ExerciseTargetSchema from '../../../../universal/model/schema/ExerciseTargetSchema'
import ExerciseTargetRelations from '../../../../universal/model/relations/ExerciseTargetRelations'

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
        <Form.Fields key={idx} evenlyDivided>
          {AutoFields.renderFields({
            entity,
            styles,
            namePrefix: `${relName}[${idx}]`,
            jsonSchema: ExerciseTargetSchema,
            relations: ExerciseTargetRelations,
            overrides: {
              exerciseId: {
                exclude: true
              }
            }
          })}
        </Form.Fields>
      )}
    />
  </div>)
}
export default ExerciseFormFields
