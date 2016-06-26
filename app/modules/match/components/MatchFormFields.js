"use strict"
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'
import MaterialField from 'components/MaterialField'
import FKSelect from 'components/FKSelect'
import {formModelField} from "utils/Util"
import {actions, track} from 'react-redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import _get from 'utils/get'
import TextField from "material-ui/TextField"
import {MUIErrorText} from "utils/Util"

export const MatchFormFields = ({
  dispatch,
  form,
  entity,
  model: {
    notes = []
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
    <MaterialField model={formModelField(entity, 'tournament_id')}>
      <FKSelect
        entity="tournament"
        variation="1"
        FKname="FKtournament"
        floatingLabelText="Tournament"
        hintText="Tournament"
        labelField="name"
        errorText={MUIErrorText(form, entity, 'tournament_id')}
      />
    </MaterialField>

    <RaisedButton label="Add note" onClick={() => {
      dispatch(actions.push(formModelField(entity, 'notes[]'), {
        text: ''
      }))
    }}/>
    <RaisedButton label="Remove note" onClick={() => {
      dispatch(actions.remove(formModelField(entity, 'notes[]'), notes ? notes.length-1 : 0))
    }}/>
    {notes && notes.map((n, i) => (
      <MaterialField model={formModelField(entity, `notes[${i}].text`)}>
        <TextField
          required
          hintText={`note ${i+1}`}
          floatingLabelText={`note ${i+1}`}
        />
        <br/>
      </MaterialField>
    ))}

  </div>
)
export default MatchFormFields