"use strict"
import React from 'react'
import TournamentSchema from '../../../../universal/model/schema/TournamentSchema'
import AutoFields from 'components/AutoFields'

const TournamentFormFields = ({form, entity}) => (
  <AutoFields
    {...{form, entity}}
    jsonSchema={TournamentSchema}
  />
);
export default TournamentFormFields;