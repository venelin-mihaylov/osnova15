"use strict"
import React from 'react'
import MatchSchema from '../../../../universal/model/schema/MatchSchema'
import MatchRelations from '../../../../universal/model/relations/MatchRelations'
import AutoFields from 'components/AutoFields'
import AutoComplete from 'material-ui/AutoComplete'
import CountryAutoCompleteProps from 'props/CountryAutoCompleteProps'

export const MatchFormFields = ({
  dispatch,
  form,
  entity
}) => (

  <div>
    <AutoFields
      {...{form, entity}}
      jsonSchema={MatchSchema}
      relations={MatchRelations}
      glue={({name}) => <br key={`glue-${name}`}/>}
      overrides={{
        country: {
          input: <AutoComplete
            floatingLabelText="Country"
            floatingLabelFixed={true}
            {...CountryAutoCompleteProps}
          />
        }
      }}
    />
  </div>
)
export default MatchFormFields