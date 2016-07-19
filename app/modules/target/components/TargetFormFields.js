'use strict'
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'
import {actions} from 'react-redux-form'
import {rrfField, MUIErrorText} from 'utils/Util'
import MaterialField from 'components/MaterialField'
import TextField from 'material-ui/TextField'
import MaterialCheckbox from 'components/MaterialCheckbox'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import IconButton from 'material-ui/IconButton'
import Toggle from 'material-ui/Toggle'

export const TargetFormFields = ({
  dispatch,
  form,
  entity,
  model: {
    target_zone = []
  }
}) => (

  <div>
    <OsnovaTextField
      {...{form, entity}}
      field='name'
      required
      hintText='name'
      floatingLabelText='name'
    />
    <MaterialField model={rrfField(entity, 'favourite')}>
      <MaterialCheckbox
        labelPosition='right'
        checkedIcon={<ActionFavorite />}
        uncheckedIcon={<ActionFavoriteBorder />}
        label='Favourite'
      />
    </MaterialField>

    <br/>

    <If condition={target_zone}>
      <fieldset style={{borderTop: '1px solid green', padding: '10px'}}>
        <legend>
          <IconButton iconClassName="fa fa-plus" onClick={() => dispatch(actions.push(rrfField(entity, 'target_zone[]'), {}))}/>
          <IconButton iconClassName="fa fa-minus" onClick={() => dispatch(actions.remove(rrfField(entity, 'target_zone[]'), target_zone ? target_zone.length - 1 : 0))}/>
          <h2 style={{marginRight: '10px', display: 'inline'}}>Target zones</h2>
        </legend>
    {target_zone && target_zone.map((n, i) => (
      <div>
        <MaterialField key={`${i}.name`} model={rrfField(entity, `target_zone[${i}].name`)}>
          <TextField
            required
            hintText='Name'
            floatingLabelText='Name'
            errorText={MUIErrorText(form, entity, `target_zone[${i}].name`)}
          />
        </MaterialField>
        <MaterialField key={`${i}.score`} model={rrfField(entity, `target_zone[${i}].score`)}>
          <TextField
            required
            hintText='Score'
            floatingLabelText='Score'
            errorText={MUIErrorText(form, entity, `target_zone[${i}].score`)}
          />
        </MaterialField>
      </div>
    ))}
      </fieldset>
    </If>
  </div>
)
export default TargetFormFields