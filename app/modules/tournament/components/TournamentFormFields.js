"use strict"
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'

const TournamentFormFields = ({form, entity}) => (
  <OsnovaTextField {...{form, entity}} field="name"/>
);
export default TournamentFormFields;