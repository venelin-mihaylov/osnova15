import React from 'react'
import AutoFields from 'components/AutoFields'
import UserSchema from '../../../../universal/model/schema/UserSchema'

export const UserFormFields = ({
  entity
}) => (
  <div>
    <AutoFields
      {...{entity}}
      jsonSchema={UserSchema}
    />
  </div>
)

UserFormFields.propTypes = {
  entity: React.PropTypes.string,
}

export default UserFormFields
