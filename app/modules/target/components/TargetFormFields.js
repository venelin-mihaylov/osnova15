import React from 'react'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ItoNFieldSet from 'components/ItoNFieldSet'
import IconButton from 'material-ui/IconButton'
import TargetSchema from '../../../../universal/model/schema/TargetSchema'
import TargetZoneSchema from '../../../../universal/model/schema/TargetZoneSchema'
import TargetZoneRelations from '../../../../universal/model/relations/TargetZoneRelations'
import AutoFields from 'components/AutoFields'
import FileField from 'components/FileField'
import {Form} from 'stardust'

import styles from 'styles/components/TargetFormFields.css'

export const TargetFormFields = ({
  dispatch,
  form,
  entity,
  model,
}) => {

  const relName = 'target_zone'

  return (<div>
    <AutoFields
      {...{form, entity}}
      jsonSchema={TargetSchema}
      glue={<br />}
      overrides={{
        favourite: {
          inputProps: {
            checkedIcon: <ActionFavorite />,
            uncheckedIcon: <ActionFavoriteBorder />
          }
        },
        image: {
          input: <FileField accept='.png,.jpg' label='Target Image' placeholder='Image' />
        }
      }}
    />
    <br />
    <ItoNFieldSet
      {...{entity, model, relName, dispatch}}
      relTitle='Target Zones'
      renderRecord={({row, idx, relName, onDeleteByIndex}) => (
        <Form.Fields key={idx} evenlyDivided>
          {AutoFields.renderFields({
            form,
            entity,
            styles,
            namePrefix: `${relName}[${idx}]`,
            jsonSchema: TargetZoneSchema,
            relations: TargetZoneRelations,
            overrides: {
              targetId: {
                exclude: true
              }
            }
          })}
        </Form.Fields>
      )}
    />
  </div>)
}

export default TargetFormFields
