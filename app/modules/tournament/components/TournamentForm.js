"use strict";
import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {Form} from "react-redux-form";
import MaterialField from "components/MaterialField";
import {formModel, formModelField} from "utils/Util";


export default class TournamentForm extends React.Component {

  dbTable = 'tournament';

  render() {
    const {
      onSubmit
    } = this.props;

    return (
      <div>
        <Form onSubmit={onSubmit} model={formModel(this.dbTable)}>
          <MaterialField model={formModelField(this.dbTable, 'name')}>
            <TextField
              required
              hintText="name"
              floatingLabelText="name"
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
                        onClick={(event) => {}}
                        style={{margin: 5}}
          />
        </Form>
      </div>
    )
  }
}
