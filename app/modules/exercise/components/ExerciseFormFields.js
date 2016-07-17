"use strict"
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import MaterialField from 'components/MaterialField'
import MaterialCheckbox from 'components/MaterialCheckbox'
import {rrfField} from 'utils/Util'

export const ExerciseFormFields = ({
  dispatch,
  form,
  entity
}) => (

  <div>
    <OsnovaTextField
      {...{form, entity}}
      field="name"
      required
      hintText="name"
      floatingLabelText="name"
    />

    <br/>

    <MaterialField model={rrfField(entity, 'favourite')}>
      <MaterialCheckbox
        checkedIcon={<ActionFavorite />}
        uncheckedIcon={<ActionFavoriteBorder />}
        label="Favourite"
      />
    </MaterialField>

    <br/>

  </div>
)
export default ExerciseFormFields