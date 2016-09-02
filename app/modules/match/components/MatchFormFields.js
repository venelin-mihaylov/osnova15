import React from 'react'
import MatchSchema from '../../../../universal/model/schema/MatchSchema'
import MatchRelations from '../../../../universal/model/relations/MatchRelations'
import AutoFields from 'components/AutoFields'
import CountrySelect from 'components/CountrySelect'

export const MatchFormFields = ({
  entity
}) => (

  <div>
    <AutoFields
      {...{entity}}
      jsonSchema={MatchSchema}
      relations={MatchRelations}
      overrides={{
        country: {
          inputEl: CountrySelect
        }
      }}
    />
  </div>
)

MatchFormFields.propTypes = {
  entity: React.PropTypes.string
}

export default MatchFormFields
