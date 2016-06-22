import React from 'react';
import RaisedButton from "material-ui/RaisedButton";

const DefaultFormButtons = props => (
  <div>
    <RaisedButton label="Submit"
                  primary={true}
                  type="submit"
                  style={{margin: 5}}
    />
    <RaisedButton label="Reset"
                  secondary={true}
                  onClick={props.onReset}
                  style={{margin: 5}}

    />
    <RaisedButton label="Cancel"
                  secondary={true}
                  onClick={props.onCancel}
                  style={{margin: 5}}

    />
  </div>
);

DefaultFormButtons.propTypes = {
  onReset: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired
};

export default DefaultFormButtons;