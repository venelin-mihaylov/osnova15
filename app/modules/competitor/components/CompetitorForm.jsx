"use strict";
import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {Form} from "react-redux-form";
import MaterialField from "components/MaterialField";
import {formModel, formModelField, MUIErrorText} from "util/Util";


export default class CompetitorForm extends React.Component {

  dbTable = 'competitor';

  render() {
    const {
      dispatch,
      action,
      onSubmit,
      form
    } = this.props;


    return (
      <Form
        onSubmit={onSubmit}
        model={formModel(this.dbTable)}
      >
        <MaterialField
          model={formModelField(this.dbTable, 'firstName')}
          validators={{
            length: v => v && v.length > 3,
            required: v => !!v
          }}
        >
          <TextField
            required
            hintText="First name"
            floatingLabelText="First name"
            errorText={MUIErrorText(form, this.dbTable, 'firstName')}
          />
        </MaterialField>

        <br/>

        <MaterialField
          model={formModelField(this.dbTable, 'familyName')}
          validators={{
            length: v => v && v.length > 3
          }}
        >
          <TextField
            required
            hintText="Family name"
            floatingLabelText="Family name"
            errorText={MUIErrorText(form, this.dbTable, 'familyName')}
          />
        </MaterialField>

        <br/>

        <MaterialField model={formModelField(this.dbTable, 'email')}>
          <TextField
            required
            hintText="email"
            floatingLabelText="email"
            errorText={MUIErrorText(form, this.dbTable, 'email')}
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
                      onClick={() => {dispatch(action.resetFormRecord())}}
                      style={{margin: 5}}
        />
      </Form>
    )
  }
}

