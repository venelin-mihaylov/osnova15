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
import CRUDActionType from 'constants/CRUDActionType'
import IconButton from "material-ui/IconButton"
import {push} from 'react-router-redux'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

export const MatchFormFields = ({
  dispatch,
  form,
  entity,
  model: {
    notes = [],
    match_competitor = []
  },
  params: {
    id
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
    <MaterialField model={formModelField(entity, 'tournamentId')}>
      <FKSelect
        entity="tournament"
        variation="1"
        FKname="FKtournament"
        floatingLabelText="Tournament"
        hintText="Tournament"
        labelField="name"
        errorText={MUIErrorText(form, entity, 'tournamentId')}
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
        if (match_competitor.find(r => r.competitorId === record.id)) return
        dispatch(actions.push(formModelField(entity, 'match_competitor[]'), {
          competitorId: record.id,
          competitor: record
        }))
        dispatch(actions.change(formModelField(''), null))
      }}
      iconButtons={[<IconButton iconClassName="fa fa-user-plus" onClick={() => {
        dispatch({
          type: CRUDActionType.prefixType('competitor', CRUDActionType.SET_NEXT_URI),
          nextUri: `/match/${id}/edit`
        })
        dispatch(push('/competitor/add'))
      }}/>]}
    />
    <br/>

    <If condition={match_competitor.length}>
      {match_competitor.map((n, i) => (
       <Chip onRequestDelete={() => dispatch(actions.remove(formModelField(entity, 'match_competitor[]'), i))}>
         competitor: {console.log(n) || n.competitor.lastName}
       </Chip>
      ))}
      <br/>
    </If>

  </div>
)
export default MatchFormFields
/*{dispatch(actions.remove(formModelField(entity, 'match_competitor[]'), match_competitor ? match_competitor.length-1 : 0))}*/