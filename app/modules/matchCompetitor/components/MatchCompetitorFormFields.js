"use strict"
import React from 'react'
import {rrfField} from "utils/Util"
import {MUIErrorText} from "utils/Util"
import FKSelect from 'components/FKSelect'
import MaterialField from 'components/MaterialField'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Toggle from 'material-ui/Toggle'

// after person create, we need to be able to get the latest created competitor
// i.e. add onCompetitorCreated

const MatchCompetitorFormFields = ({
  dispatch,
  form,
  entity,
  model,
  onClickAddCompetitor,
  resetForm,
  params: {matchId}
}) => (
  <div>
    <MaterialField model={rrfField(entity, 'competitorId')}>
      <FKSelect
        entity="competitor"
        variation="1"
        FKname="FKcompetitor1"
        floatingLabelText="Competitor"
        reset={resetForm}
        listParams={{
          filter: {
            belongsToMatch: {
              operator: '=',
              value: matchId
            }
          }
        }}
        required
        renderRecord={r => r && `${r.firstName} ${r.lastName}`}
        errorText={MUIErrorText(form, entity, 'competitorId')}
        iconButtons={[<IconButton key="user-plus" iconClassName="fa fa-user-plus" onClick={onClickAddCompetitor}/>]}
      />
      <br/>
    </MaterialField>

    <MaterialField model={rrfField(entity, 'disqualified')}>
      <Toggle
        labelPosition='right'
        label="Disqualified"
      />
    </MaterialField>

    <MaterialField model={rrfField(entity, 'notes')}>
      <TextField
        name="notes"
        floatingLabelText="notes"
        errorText={MUIErrorText(form, entity, model.notes)}
      />
    </MaterialField>

  </div>
);
export default MatchCompetitorFormFields;