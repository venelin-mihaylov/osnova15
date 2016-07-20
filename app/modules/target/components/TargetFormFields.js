'use strict'
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'
import {rrfField, MUIErrorText} from 'utils/Util'
import MaterialField from 'components/MaterialField'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ItoN from 'components/ItoN'
import IconButton from 'material-ui/IconButton'

export const TargetFormFields = ({
  dispatch,
  form,
  entity,
  model,
}) => {

  const relName = 'target_zone'

  return <div>
    <OsnovaTextField
      {...{form, entity}}
      field='name'
      required
      floatingLabelText='name'
    />
    <MaterialField model={rrfField(entity, 'favourite')}>
      <Checkbox
        labelPosition='right'
        checkedIcon={<ActionFavorite />}
        uncheckedIcon={<ActionFavoriteBorder />}
        label='Favourite'
      />
    </MaterialField>

    <br/>

    <ItoN {...{entity, model, relName, dispatch}} relTitle='Target Zones' renderRecord={(n, i, {relName, onDeleteByIndex}) => (
      <div>
        <MaterialField key={`${i}.name`} model={rrfField(entity, `${relName}[${i}].name`)}>
          <TextField
            required
            floatingLabelText='Name'
            errorText={MUIErrorText(form, entity, `${relName}[${i}].name`)}
          />
        </MaterialField>
        <MaterialField key={`${i}.score`} model={rrfField(entity, `${relName}[${i}].score`)}>
          <TextField
            required
            floatingLabelText='Score'
            errorText={MUIErrorText(form, entity, `${relName}[${i}].score`)}
          />
        </MaterialField>
        <IconButton iconClassName='fa fa-minus' onClick={() => onDeleteByIndex(i)}/>
      </div>
    )}
    />
  </div>
}
export default TargetFormFields