"use strict"
import React from 'react'
import {rrfField} from "utils/Util"
import {MUIErrorText} from "utils/Util"
import FKSelect from 'components/FKSelect'
import MaterialField from 'components/MaterialField'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'

// after person create, we need to be able to get the latest created exercise
// i.e. add onExerciseCreated

const MatchExerciseFormFields = ({
  dispatch,
  form,
  entity,
  model,
  onClickAddExercise,
  resetForm,
  params: {matchId}
}) => (
  <div>
    <MaterialField model={rrfField(entity, 'exerciseId')}>
      <FKSelect
        entity="exercise"
        variation="1"
        floatingLabelText="Exercise"
        reset={resetForm}
        listParams={{
          filter: {
            belongsToMatch: {
              params: {
                curId: model.exerciseId
              },
              operator: '=',
              value: matchId
            }
          }
        }}
        labelField="name"
        required
        errorText={MUIErrorText(form, entity, 'exerciseId')}
        iconButtons={[<IconButton key="user-plus" iconClassName="fa fa-user-plus" onClick={onClickAddExercise}/>]}
      />
      <br/>
    </MaterialField>

    <MaterialField model={rrfField(entity, 'notes')}>
      <TextField
        name="notes"
        floatingLabelText="notes"
        errorText={MUIErrorText(form, entity, model.notes)}
      />
    </MaterialField>

  </div>
);
export default MatchExerciseFormFields;