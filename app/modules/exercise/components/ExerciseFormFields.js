'use strict'
import React from 'react'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ItoNFieldSet from 'components/ItoNFieldSet'
import IconButton from 'material-ui/IconButton'
import ExerciseSchema from '../../../../universal/model/schema/ExerciseSchema'
import ExerciseTargetSchema from '../../../../universal/model/schema/ExerciseTargetSchema'
import ExerciseTargetRelations from '../../../../universal/model/relations/ExerciseTargetRelations'
import AutoFields from 'components/AutoFields'

import styles from 'styles/components/ExerciseFormFields.css'

export const ExerciseFormFields = ({
  dispatch,
  form,
  model,
  entity,
  onClickAddTarget
}) => {
  const relName = 'exercise_target'

  return <div>
    <AutoFields
      {...{form, entity, styles}}
      jsonSchema={ExerciseSchema}
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
        <div>
          <AutoFields
            {...{form, entity, styles}}
            namePrefix={`${relName}[${idx}]`}
            jsonSchema={ExerciseTargetSchema}
            relations={ExerciseTargetRelations}
            overrides={{
              exerciseId: {
                exclude: true
              },
              targetId: {
                inputProps: {
                  iconButtons: [<IconButton key="add" iconClassName="fa fa-plus" onClick={() => {
                    const fkFieldName = `${relName}[${idx}]targetId`
                    onClickAddTarget({fkFieldName})
                  }}/>]
                }
              }
            }}
          />
          <IconButton iconClassName='fa fa-minus' onClick={() => onDeleteByIndex(idx)}/>
        </div>
      )}
    />
  </div>
}
export default ExerciseFormFields