'use strict'
import React from 'react'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ItoN from 'components/ItoN'
import IconButton from 'material-ui/IconButton'
import TargetZoneSchema from '../../../../universal/schema/TargetZoneSchema'
import TargetSchema from '../../../../universal/schema/TargetSchema'
import AutoFields from 'components/AutoFields'

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
      fieldOptions={{
        favourite: {
          inputProps: {
            checkedIcon: <ActionFavorite />,
            uncheckedIcon: <ActionFavoriteBorder />
          }
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
            fieldOptions={{
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