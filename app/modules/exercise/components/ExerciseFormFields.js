"use strict"
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
      field="name"
      required
      floatingLabelText="name"
    />

    <br/>

    <div className={styles.test}>Test</div>

    <MaterialField model={rrfField(entity, 'favourite')}>
      <Checkbox
        checkedIcon={<ActionFavorite />}
        uncheckedIcon={<ActionFavoriteBorder />}
        label="Favourite"
      />
    </MaterialField>

    <ItoN {...{entity, model, relName, dispatch}}
          relTitle='Exercise Targets'
          renderRecord={(n, i, {relName, onDeleteByIndex}) => (
            <div>
              <MaterialField key={`${i}.description`} model={rrfField(entity, `${relName}[${i}].description`)}>
                <TextField
                  required
                  floatingLabelText='Description'
                  errorText={MUIErrorText(form, entity, `${relName}[${i}].description`)}
                />
              </MaterialField>
              <MaterialField key={`${i}.distance`} model={rrfField(entity, `${relName}[${i}].distance`)}>
                <TextField
                  required
                  className={styles.width80}
                  floatingLabelText='Distance'
                  errorText={MUIErrorText(form, entity, `${relName}[${i}].distance`)}
                />
              </MaterialField>
              <MaterialField key={`${i}.targetId`} model={rrfField(entity, `${relName}[${i}].targetId`)}>
                <FKSelect
                  entity="target"
                  variation="1"
                  FKname="FKtarget1"
                  floatingLabelText="Target"
                  labelField="name"
                  iconButtons={[<IconButton iconClassName="fa fa-user-plus" onClick={() => {}}/>]}
                  errorText={MUIErrorText(form, entity, 'targetId')}
                />
              </MaterialField>
              <IconButton iconClassName='fa fa-minus' onClick={() => onDeleteByIndex(i)}/>
            </div>
          )}
    />
    <br/>
  </div>
}
export default ExerciseFormFields