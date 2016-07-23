'use strict'
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import MaterialField from 'components/MaterialField'
import Checkbox from 'material-ui/Checkbox'
import {rrfField, MUIErrorText} from 'utils/Util'
import ItoN from 'components/ItoN'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import FKSelect from 'components/FKSelect'
import ExerciseSchema from '../../../../universal/model/schema/ExerciseSchema'
import ExerciseTargetSchema from '../../../../universal/model/schema/ExerciseTargetSchema'
import ExerciseTargetRelations from '../../../../universal/model/relations/ExerciseTargetRelations'
import AutoFields from 'components/AutoFields'

import styles from 'styles/components/ExerciseFormFields.css'

export const ExerciseFormFields = ({
  dispatch,
  form,
  model,
  entity
}) => {
  const relName = 'exercise_target'

  return <div>
    <OsnovaTextField
      {...{form, entity}}
      field='name'
      required
      floatingLabelText='name'
    />

    <br/>

    <div className={styles.test}>Test</div>

    <MaterialField model={rrfField(entity, 'favourite')}>
      <Checkbox
        checkedIcon={<ActionFavorite />}
        uncheckedIcon={<ActionFavoriteBorder />}
        label='Favourite'
      />
    </MaterialField>

    <ItoN {...{entity, model, relName, dispatch}}
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
                  }
                }}
              />
              <IconButton iconClassName='fa fa-minus' onClick={() => onDeleteByIndex(idx)}/>
            </div>
          )}
    />
    <br/>
  </div>
}
export default ExerciseFormFields