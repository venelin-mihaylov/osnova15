import React from 'react'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ItoNFieldSet from 'components/ItoNFieldSet'
import IconButton from 'material-ui/IconButton'
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

  return <div>
    <AutoFields
      {...{entity, styles}}
      jsonSchema={ExerciseSchema}
      glue={({name}) => <br key={`glue-${name}`} />}
      overrides={{
        favourite: {
          inputProps: {
            checkedIcon: <ActionFavorite />,
            uncheckedIcon: <ActionFavoriteBorder />
          }
        }
      }}
    />

    <ItoNFieldSet
      {...{entity, model, relName, dispatch}}
      relTitle='Exercise Targets'
      renderRecord={({row, idx, relName, onDeleteByIndex}) => (
        <Form.Fields key={`"target-${idx}`} evenlyDivided>
          <AutoFields
            {...{entity, styles}}
            namePrefix={`${relName}[${idx}]`}
            jsonSchema={ExerciseTargetSchema}
            relations={ExerciseTargetRelations}
            overrides={{
              exerciseId: {
                exclude: true
              }
            }}
          />
        </Form.Fields>
      )}
    />
  </div>
}
export default ExerciseFormFields
