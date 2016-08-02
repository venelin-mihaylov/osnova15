"use strict"
import React from 'react'
import OsnovaTextField from 'components/OsnovaTextField'
import MaterialField from 'components/MaterialField'
import FKSelect from 'components/FKSelect'
import {rrfField} from "utils/Util"
import {actions} from 'react-redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from "material-ui/TextField"
import {MUIErrorText} from "utils/Util"
import Chip from 'material-ui/Chip';
import IconButton from "material-ui/IconButton"
import MatchSchema from '../../../../universal/model/schema/MatchSchema'
import MatchRelations from '../../../../universal/model/relations/MatchRelations'
import AutoFields from 'components/AutoFields'

export const MatchFormFields = ({
  dispatch,
  form,
  entity
}) => (

  <div>
    <AutoFields
      {...{form, entity}}
      jsonSchema={MatchSchema}
      relations={MatchRelations}
      glue={({name}) => <br key={`glue-${name}`}/>}
    />
  </div>
)
export default MatchFormFields
/*{dispatch(actions.remove(rrfField(entity, 'match_competitor[]'), match_competitor ? match_competitor.length-1 : 0))}*/