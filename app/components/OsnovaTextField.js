import React from 'react'
import {formModelField} from "utils/Util"
import {MUIErrorText} from "utils/Util"
import MaterialField from "components/MaterialField"
import TextField from "material-ui/TextField"

const OsnovaTextField = ({form, entity, field, ...rest}) => (
  <MaterialField model={formModelField(entity, field)}>
    <TextField
      hintText="name"
      floatingLabelText="name"
      errorText={MUIErrorText(form, entity, field)}
      {...rest}
    />
  </MaterialField>
)

OsnovaTextField.propTypes = {
  form: React.PropTypes.object.isRequired,
  entity: React.PropTypes.string.isRequired,
  field: React.PropTypes.string.isRequired,
}

export default  OsnovaTextField