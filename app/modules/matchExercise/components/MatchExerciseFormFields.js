"use strict"
import React from 'react'
import {rrfField} from "utils/Util"
import {MUIErrorText} from "utils/Util"
import FKSelect from 'components/FKSelect'
import MaterialField from 'components/MaterialField'
import TextField from 'material-ui/TextField'

import AutoFields from 'components/AutoFields'
import MatchExerciseSchema from '../../../../universal/model/schema/MatchExerciseSchema'
import MatchExerciseRelations from '../../../../universal/model/relations/MatchExerciseRelations'
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
    <AutoFields
      {...{form, entity}}
      jsonSchema={MatchExerciseSchema}
      relations={MatchExerciseRelations}
      glue={({name}) => <br key={`glue-${name}`}/>}
      overrides={{
        matchId: {exclude: true},
        exerciseId: {
          inputProps: {
            renderRecord: r => r && `${r.name}`,
            listParams: {
              filter: {
                belongsToMatch: {
                  operator: '=',
                  value: matchId
                }
              }
            },
            iconButtons: [<IconButton key="exercise-plus" iconClassName="fa fa-user-plus" onClick={onClickAddExercise}/>]
          }
        }
      }}
    />
  </div>
);
export default MatchExerciseFormFields;