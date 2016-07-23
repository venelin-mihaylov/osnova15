"use strict"
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'
import MaterialField from 'components/MaterialField'
import FKSelect from 'components/FKSelect'
import {rrfField} from "utils/Util"
import {actions} from 'react-redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from "material-ui/TextField"
import {MUIErrorText} from "utils/Util"
import Chip from 'material-ui/Chip';
import IconButton from "material-ui/IconButton"
import MatchSchema from '../../../../universal/model/schema/MatchSchema'
import MatchRelations from '../../../../universal/model/relations/MatchRelations'
import AutoFields from 'components/AutoFields'

export const MatchFormFields = ({
  dispatch,
  form,
  entity,
  model: {
    notes = [],
    match_competitor = []
  },
  onClickAddCompetitor,
  onSelectCompetitor
}) => (

  <div>

    <AutoFields
      {...{form, entity}}
      jsonSchema={MatchSchema}
      relations={MatchRelations}
    />

    <RaisedButton label="Add note" style={{margin: 5}} onClick={() => {
      dispatch(actions.push(rrfField(entity, 'notes[]'), {
        text: ''
      }))
    }}/>
    <RaisedButton label="Remove note" style={{margin: 5}} onClick={() => {
      dispatch(actions.remove(rrfField(entity, 'notes[]'), notes ? notes.length - 1 : 0))
    }}/>
    {notes && notes.map((n, i) => (
      <MaterialField model={rrfField(entity, `notes[${i}].text`)}>
        <TextField
          required
          floatingLabelText={`note ${i + 1}`}
        />
        <br/>
      </MaterialField>
    ))}

    <FKSelect
      entity="competitor"
      variation="1"
      floatingLabelText="Add competitor"
      renderRecord={r => `${r.firstName} ${r.lastName}`}
      onChange={onSelectCompetitor}
      iconButtons={[<IconButton iconClassName="fa fa-user-plus" onClick={onClickAddCompetitor}/>]}
    />
    <br/>

    <If condition={match_competitor.length}>
      {match_competitor.map((n, i) => (
       <Chip onRequestDelete={() => dispatch(actions.remove(rrfField(entity, 'match_competitor[]'), i))}>
         competitor: {n.competitor.lastName}
       </Chip>
      ))}
      <br/>
    </If>

  </div>
)
export default MatchFormFields
/*{dispatch(actions.remove(rrfField(entity, 'match_competitor[]'), match_competitor ? match_competitor.length-1 : 0))}*/