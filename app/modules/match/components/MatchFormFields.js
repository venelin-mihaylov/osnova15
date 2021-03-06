import React from 'react'
import MatchSchema from '../../../../universal/model/schema/MatchSchema'
import MatchRelations from '../../../../universal/model/relations/MatchRelations'
import AutoFields from 'components/AutoFields'
import CountrySelect from 'components/CountrySelect'
import {Button} from 'semantic-ui-react'

export const MatchFormFields = ({
  entity,
}) => (

  <div>
    <AutoFields
      {...{entity}}
      jsonSchema={MatchSchema}
      relations={MatchRelations}
      overrides={{
        tournamentId: {
          showButtonClearValue: true
        },
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

MatchFormFields.propTypes = {
  entity: React.PropTypes.string
}

export default MatchFormFields
