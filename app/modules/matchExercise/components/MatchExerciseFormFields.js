import React from 'react'
import AutoFields from 'components/AutoFields'
import MatchExerciseSchema from '../../../../universal/model/schema/MatchExerciseSchema'
import MatchExerciseRelations from '../../../../universal/model/relations/MatchExerciseRelations'
import IconButton from 'material-ui/IconButton'

// after person create, we need to be able to get the latest created exercise
// i.e. add onExerciseCreated

const MatchExerciseFormFields = ({
  record,
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
      overrides={{
        matchId: {exclude: true},
        exerciseId: {
          inputProps: {
            renderLabel: r => r && `${r.name}`,
            listParams: {
              filter: {
                belongsToMatch: {
                  params: {
                    curId: record && record.exerciseId
                  },
                  operator: '=',
                  value: matchId
                }
              }
            },
            iconButtons: [<IconButton key='exercise-plus' iconClassName='fa fa-user-plus' onClick={onClickAddExercise}/>]
          }
        }
      }}
    />
  </div>
);
export default MatchExerciseFormFields;