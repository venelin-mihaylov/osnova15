import React from 'react'
import ItoNFieldSet from 'components/ItoNFieldSet'
import TargetSchema from '../../../../universal/model/schema/TargetSchema'
import TargetZoneSchema from '../../../../universal/model/schema/TargetZoneSchema'
import TargetZoneRelations from '../../../../universal/model/relations/TargetZoneRelations'
import AutoFields from 'components/AutoFields'
import FileField from 'components/FileField'
import {Form} from 'stardust'

import styles from 'styles/components/TargetFormFields.css'

export const TargetFormFields = ({
  dispatch,
  entity,
  model,
}) => {
  const relName = 'target_zone'
  return (<div>
    <AutoFields
      entity={entity}
      jsonSchema={TargetSchema}
      overrides={{
        image: {
          control: FileField,
          accept: '.png,.jpg',
          label: 'Target Image',
          placeholder: 'Image',
          rrfProps: {
            updateOn: 'change'
          }
        }
      }}
    />
    <br />
    <ItoNFieldSet
      {...{entity, model, relName, dispatch}}
      relTitle='Target Zones'
      renderRecord={({idx}) => (<Form.Group key={idx} widths='equal'>
        {AutoFields.renderFields({
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
      </Form.Group>)}
    />
  </div>)
}

TargetFormFields.propTypes = {
  dispatch: React.PropTypes.func,
  entity: React.PropTypes.string,
  model: React.PropTypes.object
}

export default TargetFormFields
