import React from 'react'
import ItoNFieldSet from 'components/ItoNFieldSet'
import AutoFields from 'components/AutoFields'
import {Form, Icon, Button, Input} from 'stardust'
import ExerciseSchema from '../../../../universal/model/schema/ExerciseSchema'
import ExerciseTargetSchema from '../../../../universal/model/schema/ExerciseTargetSchema'
import ExerciseTargetRelations from '../../../../universal/model/relations/ExerciseTargetRelations'

import styles from 'styles/components/ExerciseFormFields.css'

export const MatchExerciseFormFields = ({
  dispatch,
  model,
  entity,
  onClickAddTarget
}) => {
  const relName = 'exercise_target'

  return (<div>
    <AutoFields
      {...{entity, styles}}
      jsonSchema={ExerciseSchema}
    />

    <ItoNFieldSet
      {...{entity, model, relName, dispatch}}
      relTitle='Exercise Targets'
      renderRecord={({row, idx}) => (
        <div key={idx}>
          <Form.Group >
            {AutoFields.renderFields({
              entity,
              styles,
              namePrefix: `${relName}[${idx}]`,
              jsonSchema: ExerciseTargetSchema,
              relations: ExerciseTargetRelations,
              overrides: {
                distance: {
                  style: {
                    width: 80
                  }
                },
                weight: {
                  style: {
                    width: 80
                  }
                },
                score: {
                  style: {
                    width: 80
                  }
                },
                targetId: {
                  listParams: {
                    filter: {
                      favourite: true
                    }
                  },
                  buttons: <Button className='icon' onClick={onClickAddTarget(`${relName}[${idx}]targetId`)}><Icon name='add' /></Button>
                },
                exerciseId: {
                  exclude: true
                }
              }
            })}
          </Form.Group>
          <If condition={row.match_exercise_target_zone}>
            <Form.Group>
              {row.match_exercise_target_zone.map(() => (<Form.Field>
                <label>Zone XX</label>
                <Input />
              </Form.Field>))}
            </Form.Group>
          </If>
        </div>
      )}
    />
  </div>)
}

MatchExerciseFormFields.propTypes = {
  dispatch: React.PropTypes.func,
  model: React.PropTypes.object,
  entity: React.PropTypes.string,
  onClickAddTarget: React.PropTypes.func
}

export default MatchExerciseFormFields
