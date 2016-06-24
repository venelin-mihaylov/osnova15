"use strict"
import React from "react"
import {Form, actions} from "react-redux-form"
import {formModel, formModelField} from "utils/Util"
import DefaultFormButtons from 'components/DefaultFormButtons'
import Loading from 'components/Loading'
import GlobalError from 'components/GlobalError'
import Saving from 'components/Saving'
import OsnovaTextField from 'components/OsnovaTextField'
import FKSelect from 'components/FKSelect'
import MaterialField from "components/MaterialField"

const CompetitorForm = ({
  dispatch,
  onSubmit,
  onReset,
  onCancel,
  entity,
  redux: {
    globalError,
    saving,
    loading
  },
  form
}) => (
  <div>
    <Saving {...{saving}} />
    <Loading {...{loading}} />
    <GlobalError {...{globalError}}/>
    <Form
      {...{onSubmit}}
      model={formModel(entity)}
      validators={{
        name: {
          length: v => v && v.length > 10
        }
      }}
    >
      <OsnovaTextField {...{form, entity}} field="name" required/>

      <MaterialField model={formModelField(entity, 'tournament_id')}>
        <FKSelect
          entity="tournament"
          variation="1"
          FKname="FKtournament"
          floatingLabelText="Tournament"
          hintText="Tournament"
          labelField="name"
        />
      </MaterialField>

      <DefaultFormButtons {...{onReset, onCancel}}/>

    </Form>
  </div>
)
export default CompetitorForm