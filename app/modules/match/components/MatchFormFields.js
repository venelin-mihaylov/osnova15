"use strict"
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'
import MaterialField from 'components/MaterialField'
import FKSelect from 'components/FKSelect'
import {formModelField} from "utils/Util"

export const MatchFormFields = ({form, entity}) => (
  <div>
    <OsnovaTextField {...{form, entity}} field="name" required/>
    <MaterialField model={formModelField(entity, 'tournament_id')}>
      <FKSelect
        entity="tournament"
        variation="1"
        FKname="FKtournament"
        floatingLabelText="Match"
        hintText="Match"
        labelField="name"
      />
    </MaterialField>
  </div>
)
export default MatchFormFields