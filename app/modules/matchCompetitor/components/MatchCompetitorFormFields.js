"use strict"
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'

const MatchCompetitorFormFields = ({form, entity}) => (
  <OsnovaTextField {...{form, entity}} field="name"/>
);
export default MatchCompetitorFormFields;