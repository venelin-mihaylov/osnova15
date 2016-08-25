import React from 'react'
import TournamentSchema from '../../../../universal/model/schema/TournamentSchema'
import AutoFields from 'components/AutoFields'

const TournamentFormFields = ({entity}) => (
  <AutoFields
    {...{entity}}
    glue={({name}) => <br key={`glue-${name}`} />}
    jsonSchema={TournamentSchema}
  />
)

TournamentFormFields.propTypes = {
  entity: React.PropTypes.string.isRequired
}

export default TournamentFormFields
