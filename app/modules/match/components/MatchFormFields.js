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
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper'
import IconButton from "material-ui/IconButton"
import {push} from 'react-router-redux'

export const MatchFormFields = ({
  dispatch,
  form,
  entity,
  model: {
    notes = [],
    competitor_match = []
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
      <br/>
    </MaterialField>

    <RaisedButton label="Add note" style={{margin: 5}} onClick={() => {
      dispatch(actions.push(formModelField(entity, 'notes[]'), {
        text: ''
      }))
    }}/>
    <RaisedButton label="Remove note" style={{margin: 5}} onClick={() => {
      dispatch(actions.remove(formModelField(entity, 'notes[]'), notes ? notes.length - 1 : 0))
    }}/>
    {notes && notes.map((n, i) => (
      <MaterialField model={formModelField(entity, `notes[${i}].text`)}>
        <TextField
          required
          hintText={`note ${i + 1}`}
          floatingLabelText={`note ${i + 1}`}
        />
        <br/>
      </MaterialField>
    ))}

    <FKSelect
      entity="competitor"
      variation="1"
      FKname="FKcompetitor1"
      floatingLabelText="Add competitor"
      hintText="Add competitor"
      labelField="lastName"
      renderRecords={(rs = []) => rs.map(r => ({text: r.lastName, value: r.lastName}))}
      onChange={(id, record) => {
        if (competitor_match.find(r => r.id === record.id)) return

        dispatch(actions.push(formModelField(entity, 'competitor_match[]'), record))
        dispatch(actions.change(formModelField(''), null))
      }}
      iconButtons={[<IconButton iconClassName="fa fa-user-plus" onClick={() => {
        dispatch(push('/competitor/add'))
      }}/>]}
    />
    <br/>

    <If condition={competitor_match.length}>
      <br/>
      <Paper style={{padding: '10px', width: '300px', height: '300px'}}>
      {competitor_match.map((n, i) => (
       <Chip onRequestDelete={() => dispatch(actions.remove(formModelField(entity, 'competitor_match[]'), i))}>
         competitor: {n.lastName}
       </Chip>
      ))}
      </Paper>
      <br/>
    </If>

  </div>
)
export default MatchFormFields
/*{dispatch(actions.remove(formModelField(entity, 'competitor_match[]'), competitor_match ? competitor_match.length-1 : 0))}*/