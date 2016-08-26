import React from 'react'
import AutoFields from 'components/AutoFields'
import CompetitorSchema from '../../../../universal/model/schema/CompetitorSchema'
import AutoComplete from 'material-ui/AutoComplete'
import CountryAutoCompleteProps from 'props/CountryAutoCompleteProps'

export const CompetitorFormFields = ({
  record,
  dispatch,
  entity
}) => (
  <div>
    <AutoFields
      {...{entity}}
      jsonSchema={CompetitorSchema}
      glue={({name}) => <br key={`glue-${name}`} />}
      overrides={{
        country: {
          input: <AutoComplete
            floatingLabelText='Country'
            floatingLabelFixed
            {...CountryAutoCompleteProps}
          />
        }
      }}
    />
  </div>
)
export default CompetitorFormFields
