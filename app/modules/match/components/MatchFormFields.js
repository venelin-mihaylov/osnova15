import React from 'react'
import MatchSchema from '../../../../universal/model/schema/MatchSchema'
import MatchRelations from '../../../../universal/model/relations/MatchRelations'
import AutoFields from 'components/AutoFields'
import AutoComplete from 'material-ui/AutoComplete'
import CountryAutoCompleteProps from 'props/CountryAutoCompleteProps'

export const MatchFormFields = ({
  entity
}) => (

  <div>
    <AutoFields
      {...{entity}}
      jsonSchema={MatchSchema}
      relations={MatchRelations}
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

MatchFormFields.propTypes = {
  entity: React.PropTypes.string
}

export default MatchFormFields
