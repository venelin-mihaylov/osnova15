import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

const DefaultFormButtons = props => (
  <div>
    <RaisedButton
      label="Submit"
      primary
      type="submit"
      icon={<FontIcon className="fa fa-database" />}
      style={{margin: 5}}
    />
    <RaisedButton
      label="Reset"
      secondary
      icon={<FontIcon className="fa fa-eraser" />}
      onClick={props.onReset}
      style={{margin: 5}}
    />
    <RaisedButton
      label="Cancel"
      secondary
      onClick={props.onCancel}
      icon={<FontIcon className="fa fa-times" />}
      style={{margin: 5}}
    />
  </div>
)

DefaultFormButtons.propTypes = {
  onReset: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
}

export default DefaultFormButtons
