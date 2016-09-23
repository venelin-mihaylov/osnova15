import React from 'react'
import {Button, Icon} from 'stardust'
import classNames from 'classnames'

const DefaultFormButtons = ({onReset, onCancel, saving}) => (
  <div style={{marginTop: 5}}>
    <Button
      type='submit'
      className={classNames({
        primary: true,
        labeled: true,
        icon: true,
        disabled: saving,
        loading: saving,
      })}
    >
      <Icon name='write' />
      Save
    </Button>
    <Button
      className={classNames({
        labeled: true,
        icon: true,
      })}
      onClick={onReset}
    >
      <Icon name='undo' />
      Reset
    </Button>
    <Button
      className={classNames({
        red: true,
        labeled: true,
        icon: true,
      })}
      onClick={onCancel}
    >
      <Icon name='remove' />
      Cancel
    </Button>
  </div>
)

DefaultFormButtons.propTypes = {
  onReset: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
}

export default DefaultFormButtons
