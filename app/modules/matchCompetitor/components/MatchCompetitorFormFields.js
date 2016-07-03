"use strict"
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'

// after person create, we need to be able to get the latest created competitor
// i.e. add onCompetitorCreated

const MatchCompetitorFormFields = ({form, entity}) => (
  <OsnovaTextField {...{form, entity}} field="name"/>
);
export default MatchCompetitorFormFields;