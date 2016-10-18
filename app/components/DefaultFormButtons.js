import React from 'react'
import {Button} from 'semantic-ui-react'

const DefaultFormButtons = ({onReset, onCancel, saving}) => (
  <div style={{marginTop: 5}}>
    <Button
      type='submit'
      icon='write'
      content='Save'
      primary
      loading={saving}
    />
    <Button
      content='Reset'
      icon='undo'
      onClick={onReset}
    />
    <Button
      color='red'
      icon='remove'
      content='Cancel'
      onClick={onCancel}
    />
  </div>
)

DefaultFormButtons.propTypes = {
  onReset: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
}

export default DefaultFormButtons
