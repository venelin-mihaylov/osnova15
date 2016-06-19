"use strict";
import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {Form, actions} from "react-redux-form";
import MaterialField from "components/MaterialField";
import {formModel, formModelField} from "utils/Util";
import {MUIErrorText} from "utils/Util";

const TournamentForm = props => {
  const {
    dispatch,
    onSubmit,
    onReset,
    entity,
    redux: {
      globalError,
      saving,
      loading
    },
    form
  } = props;

  return (
    <div>
      {loading && <p>Loading...</p>}
      {saving && <p>Saving ...</p>}
      {globalError && <p>global error:{globalError}</p>}
      <Form
        onSubmit={onSubmit}
        model={formModel(entity)}
        validators={{
          name: {
            length: v => v && v.length > 10
          }
        }}

      >
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

        <RaisedButton label="errors"
                      secondary={true}
                      onClick={() => {
                        dispatch(actions.setErrors(formModelField('tournament', 'name'), 'too many errors'));
                      }}
                      style={{margin: 5}}
        />

        <RaisedButton label="clear errors"
                      secondary={true}
                      onClick={() => {
                        dispatch(actions.setErrors(formModelField('tournament', 'name'), false));
                        dispatch(actions.setValidity(formModelField('tournament', 'name'), true));
                      }}
                      style={{margin: 5}}
        />
      </Form>
    </div>
  )
};
export default TournamentForm;