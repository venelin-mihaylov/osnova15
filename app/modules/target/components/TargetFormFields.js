"use strict"
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'
import {actions} from 'react-redux-form'
import {rrfField, MUIErrorText} from 'utils/Util'
import RaisedButton from 'material-ui/RaisedButton'
import MaterialField from 'components/MaterialField'
import TextField from 'material-ui/TextField'

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
      field="name"
      required
      hintText="name"
      floatingLabelText="name"
    />

    <br/>

    <RaisedButton label="Add zone" style={{margin: 5}} onClick={() => {
      dispatch(actions.push(rrfField(entity, 'target_zone[]'), {
        text: ''
      }))
    }}/>
    <RaisedButton label="Remove zone" style={{margin: 5}} onClick={() => {
      dispatch(actions.remove(rrfField(entity, 'target_zone[]'), target_zone ? target_zone.length - 1 : 0))
    }}/>
    {target_zone && target_zone.map((n, i) => (
      <div>
        <MaterialField key={`${i}.name`} model={rrfField(entity, `target_zone[${i}].name`)}>
          <TextField
            required
            hintText="Name"
            floatingLabelText="Name"
            errorText={MUIErrorText(form, entity, `target_zone[${i}].name`)}
          />
        </MaterialField>
        <MaterialField key={`${i}.score`} model={rrfField(entity, `target_zone[${i}].score`)}>
          <TextField
            required
            hintText="Score"
            floatingLabelText="Score"
            errorText={MUIErrorText(form, entity, `target_zone[${i}].score`)}
          />
        </MaterialField>
      </div>
    ))}
  </div>
)
export default TargetFormFields