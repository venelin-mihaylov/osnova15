'use strict'
import React from 'react'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ItoN from 'components/ItoN'
import IconButton from 'material-ui/IconButton'
import TargetSchema from '../../../../universal/model/schema/TargetSchema'
import TargetZoneSchema from '../../../../universal/model/schema/TargetZoneSchema'
import TargetZoneRelations from '../../../../universal/model/relations/TargetZoneRelations'
import AutoFields from 'components/AutoFields'
import FileField from 'components/FileField'
import TextField from 'material-ui/TextField'



import styles from 'styles/components/TargetFormFields.css'

export const TargetFormFields = ({
  dispatch,
  form,
  entity,
  model,
}) => {

  const relName = 'target_zone'

  return <div>
    <AutoFields
      {...{form, entity}}
      jsonSchema={TargetSchema}
      overrides={{
        favourite: {
          inputProps: {
            checkedIcon: <ActionFavorite />,
            uncheckedIcon: <ActionFavoriteBorder />
          }
        },
        image: {
          input: <FileField accept=".png,.jpg" placeholder="Image"/>
        }
      }}
    />
    <br/>
    <ItoN
      {...{entity, model, relName, dispatch}}
      relTitle='Target Zones'
      renderRecord={({row, idx, relName, onDeleteByIndex}) => (
        <div>
          <AutoFields
            {...{form, entity, styles}}
            namePrefix={`${relName}[${idx}]`}
            jsonSchema={TargetZoneSchema}
            relations={TargetZoneRelations}
            overrides={{
              targetId: {
                exclude: true
              }
            }}
          />
          <IconButton iconClassName='fa fa-minus' onClick={() => onDeleteByIndex(idx)}/>
        </div>
      )}
    />
  </div>
}

export default TargetFormFields