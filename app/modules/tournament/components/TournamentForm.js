"use strict";
import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import {Form, actions} from "react-redux-form";
import {formModel, formModelField} from "utils/Util";
import DefaultFormButtons from 'components/DefaultFormButtons';
import Loading from 'components/Loading';
import Saving from 'components/Saving';
import GlobalError from 'components/GlobalError';
import OsnovaTextField from 'components/OsnovaTextField';

const TournamentForm = ({
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
}) => (
  <div>
    <Loading {...{loading}} />
    <Saving {...{saving}} />
    <GlobalError {...{globalError}}/>
    <Form
      {...{onSubmit}}
      model={formModel(entity)}
      validators={{
        name: {
          length: v => v && v.length > 10
        }
      }}
    >
      <OsnovaTextField {...{form, entity}} field="name"/>
      <DefaultFormButtons {...{onReset}}/>

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
);
export default TournamentForm;