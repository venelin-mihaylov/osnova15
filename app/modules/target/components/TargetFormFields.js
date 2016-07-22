'use strict'
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'
import {rrfField, MUIErrorText} from 'utils/Util'
import MaterialField from 'components/MaterialField'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ItoN from 'components/ItoN'
import IconButton from 'material-ui/IconButton'
import {relationMappings} from '../../../../universal/model/TargetZone'
import TargetZoneSchema from '../../../../universal/schema/TargetZoneSchema'
import AutoFields from 'components/AutoFields'

import styles from 'styles/components/TargetFormFields.css'

export const TargetFormFields = ({
  dispatch,
  form,
  entity,
  model,
}) => {

  const relName = 'target_zone'

  console.log(relationMappings)

  return <div>
    <OsnovaTextField
      {...{form, entity}}
      field='name'
      required
      floatingLabelText='name'
    />
    <MaterialField model={rrfField(entity, 'favourite')}>
      <Checkbox
        labelPosition='right'
        checkedIcon={<ActionFavorite />}
        uncheckedIcon={<ActionFavoriteBorder />}
        label='Favourite'
      />
    </MaterialField>

    <br/>

    <ItoN {...{entity, model, relName, dispatch}} relTitle='Target Zones' renderRecord={({row, idx, relName, onDeleteByIndex}) => (
      <div>
        <AutoFields
          {...{form, entity, styles}}
          namePrefix={`${relName}[${idx}]`}
        />
        <IconButton iconClassName='fa fa-minus' onClick={() => onDeleteByIndex(idx)}/>
      </div>
    )}
    />
  </div>
}

//
// <MaterialField key={`${idx}.name`} model={rrfField(entity, `${relName}[${idx}].name`)}>
//   <TextField
//     required
//     floatingLabelText='Name'
//     floatingLabelFixed={true}
//     className={styles.name}
//     errorText={MUIErrorText(form, entity, `${relName}[${idx}].name`)}
//   />
// </MaterialField>
// <MaterialField key={`${idx}.score`} model={rrfField(entity, `${relName}[${idx}].score`)}>
// <TextField
// required
// floatingLabelText='Score'
// floatingLabelFixed={true}
// className={styles.score}
// errorText={MUIErrorText(form, entity, `${relName}[${idx}].score`)}
// />
// </MaterialField>

export default TargetFormFields