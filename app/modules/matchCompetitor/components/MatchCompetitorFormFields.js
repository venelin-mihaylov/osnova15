"use strict"
import React from 'react'
import {rrfField} from "utils/Util"
import {MUIErrorText} from "utils/Util"
import FKSelect from 'components/FKSelect'
import MaterialField from 'components/MaterialField'
import MaterialToggle from 'components/MaterialToggle'

// after person create, we need to be able to get the latest created competitor
// i.e. add onCompetitorCreated

const MatchCompetitorFormFields = ({form, entity, model, dispatch}) => (
  <div>
    <MaterialField model={rrfField(entity, 'competitorId')}>
      <FKSelect
        entity="competitor"
        variation="1"
        FKname="FKcompetitor1"
        floatingLabelText="Competitor"
        hintText="Competitor"
        labelField="lastName"
        errorText={MUIErrorText(form, entity, 'competitorId')}
      />
      <br/>
    </MaterialField>
    <MaterialField model={rrfField(entity, 'disqualified')}>
      <MaterialToggle
        labelPosition='right'
        label="Disqualified"
      />
    </MaterialField>

  </div>
);
export default MatchCompetitorFormFields;