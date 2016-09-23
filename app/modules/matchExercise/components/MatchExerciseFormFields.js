import React from 'react'
import ItoNFieldSet from 'components/ItoNFieldSet'
import AutoFields from 'components/AutoFields'
import {Form, Icon, Button, Input} from 'stardust'
import ExerciseSchema from '../../../../universal/model/schema/ExerciseSchema'
import ExerciseTargetSchema from '../../../../universal/model/schema/ExerciseTargetSchema'
import ExerciseTargetRelations from '../../../../universal/model/relations/ExerciseTargetRelations'
import MatchExerciseTargetZoneSchema from '../../../../universal/model/schema/MatchExerciseTargetZoneSchema'
import {rrfField} from 'utils/Util'
import {actions} from 'react-redux-form'

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

                  postLoadRecord: ({target_zone}) => { // eslint-disable-line
                    const ff = `${relName}[${idx}]match_exercise_target_zone[]`
                    dispatch(actions.filter(rrfField(entity, ff), () => false))
                    target_zone.forEach(r => dispatch(actions.push(rrfField(entity, ff), r)))
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
            <fieldset>
              {row.match_exercise_target_zone.map((r, idx2) => (<Form.Group>
                <Form.Input label='Zone' readOnly value={r.name}/>
                {AutoFields.renderFields({
                  entity,
                  className: 'mini',
                  include: ['weight', 'score'],
                  namePrefix: `${relName}[${idx}]match_exercise_target_zone[${idx2}]`,
                  jsonSchema: MatchExerciseTargetZoneSchema,
                })}
              </Form.Group>))}
            </fieldset>
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
