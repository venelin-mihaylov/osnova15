import React from 'react'
import AutoFields from 'components/AutoFields'
import CompetitorSchema from '../../../../universal/model/schema/CompetitorSchema'
import CountrySelect from 'components/CountrySelect'

export const CompetitorFormFields = ({
  entity
}) => (
  <div>
    <AutoFields
      {...{entity}}
      jsonSchema={CompetitorSchema}
      overrides={{
        country: {
          control: CountrySelect,
          rrfProps: {
            updateOn: 'change',
            mapProps: AutoFields.mapPropsDropdown
          }
        },
      }}
    />
  </div>
)

CompetitorFormFields.propTypes = {
  entity: React.PropTypes.string,
}

export default CompetitorFormFields
