"use strict"
import React from 'react'
import AutoFields from 'components/AutoFields'
import CompetitorSchema from '../../../../universal/model/schema/CompetitorSchema'
import AutoComplete from 'material-ui/AutoComplete'
import CountryAutoCompleteProps from 'props/CountryAutoCompleteProps'

export const CompetitorFormFields = ({
  dispatch,
  entity
}) => (
  <div>
    <AutoFields
      {...{entity}}
      jsonSchema={CompetitorSchema}
      overrides={{
        country: {
          input: <AutoComplete
            floatingLabelText="Country"
            floatingLabelFixed={true}
            {...CountryAutoCompleteProps}
          />
        }
      }}
      glue={({name}) => <br key={`glue-${name}`}/>}
    />
  </div>
)
export default CompetitorFormFields