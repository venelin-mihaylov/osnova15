"use strict";
import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import MaterialField from "components/MaterialField";
import {Form, actions} from "react-redux-form";
import FKSelect from "modules/common/components/FKSelect";
import {r} from "react-rethinkdb";
import {formModel, formModelField} from "util/Util";

export default class MatchForm extends React.Component {

  dbTable = 'match';

  render() {
    const {
      dispatch,
      onSubmit
    } = this.props;

    const model = formModel(this.dbTable);

    return (
      <Form onSubmit={onSubmit} model={model}>
        <div>
          <MaterialField model={formModelField(this.dbTable, 'name')}>
            <TextField
              required
              hintText="name"
              floatingLabelText="name"
            />
          </MaterialField>
          <MaterialField model={formModelField(this.dbTable, 'tournamentID')}>
            <FKSelect
              dbTable="tournament"
              FKname="FKtournament"
              floatingLabelText="Tournament"
              hintText="Tournament"
              labelField="name"
              queryListRecords={(dbTable) => { return r.table(dbTable)}}
              renderRecords={records => {
                return !records ? [] : records.map(r => ({text: r.name, value: r.name}))
              }}
            />
          </MaterialField>
          <RaisedButton label="Submit"
                        type="submit"
                        primary={true}
                        style={{margin: 5}}
          />
          <RaisedButton label="Reset"
                        secondary={true}
                        onClick={() => dispatch(actions.reset(model))}
                        style={{margin: 5}}
          />

        </div>
      </Form>
    )
  }
}
