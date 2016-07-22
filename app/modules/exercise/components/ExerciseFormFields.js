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
          renderRecord={({row, idx, relName, onDeleteByIndex}) => (
            <div key={idx}>
              <MaterialField key={`${idx}.description`} model={rrfField(entity, `${relName}[${idx}].description`)}>
                <TextField
                  required
                  floatingLabelText='Description'
                  errorText={MUIErrorText(form, entity, `${relName}[${idx}].description`)}
                />
              </MaterialField>
              <MaterialField key={`${idx}.distance`} model={rrfField(entity, `${relName}[${idx}].distance`)}>
                <TextField
                  required
                  className={styles.width80}
                  floatingLabelText='Distance'
                  errorText={MUIErrorText(form, entity, `${relName}[${idx}].distance`)}
                />
              </MaterialField>
              <MaterialField key={`${idx}.targetId`} model={rrfField(entity, `${relName}[${idx}].targetId`)}>
                <FKSelect
                  entity="target"
                  variation="1"
                  FKname="FKtarget1"
                  floatingLabelText="Target"
                  labelField="name"
                  required
                  iconButtons={[<IconButton key="add" iconClassName="fa fa-user-plus" onClick={() => {}}/>]}
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