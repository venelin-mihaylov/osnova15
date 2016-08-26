import React from 'react'
import AutoFields from 'components/AutoFields'
import CompetitorSchema from '../../../../universal/model/schema/CompetitorSchema'

export const CompetitorFormFields = ({
  entity
}) => (
  <div>
    <AutoFields
      {...{entity}}
      jsonSchema={CompetitorSchema}
      glue={({name}) => <br key={`glue-${name}`} />}
    />
  </div>
)

CompetitorFormFields.propTypes = {
  entity: React.PropTypes.string,
}

export default CompetitorFormFields
