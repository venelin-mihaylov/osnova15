"use strict";
import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {Form, actions} from "react-redux-form";
import MaterialField from "components/MaterialField";
import {formModel, formModelField} from "utils/Util";
import {MUIErrorText} from "utils/Util";


export default class TournamentForm extends React.Component {

  render() {
    const {
      onSubmit,
      onReset,
      entity,
      redux: {
        globalError,
        fieldErrors,
        saving,
        loading
      },
      form
    } = this.props;

    return (
      <div>
        {loading && <p>Loading...</p>}
        {saving && <p>Saving ...</p>}
        {globalError && <p>global error:{globalError}</p>}
        <Form onSubmit={onSubmit} model={formModel(entity)}>
          <MaterialField model={formModelField(entity, 'name')}>
            <TextField
              required
              hintText="name"
              floatingLabelText="name"
              errorText={MUIErrorText(form, entity, 'name')}
            />
          </MaterialField>

          <br/>
          <RaisedButton label="Submit"
                        primary={true}
                        type="submit"
                        style={{margin: 5}}
          />
          <RaisedButton label="Reset"
                        secondary={true}
                        onClick={onReset}
                        style={{margin: 5}}
          />
        </Form>
      </div>
    )
  }
}
