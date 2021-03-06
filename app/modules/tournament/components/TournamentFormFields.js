import React from 'react'
import TournamentSchema from '../../../../universal/model/schema/TournamentSchema'
import AutoFields from 'components/AutoFields'
import {rrfField} from 'utils/Util'
import {Errors} from 'react-redux-form'

const TournamentFormFields = ({entity}) => (<div>

  <AutoFields
    {...{entity}}
    jsonSchema={TournamentSchema}
  />

  <Errors
    model={rrfField(entity, 'name')}
    messages={{
      required: 'is required',
      minLength: 'min length',
      maxLength: 'max length'
    }}
  />
</div>)

TournamentFormFields.propTypes = {
  entity: React.PropTypes.string.isRequired
}

export default TournamentFormFields
