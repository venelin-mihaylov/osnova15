"use strict"
import React from "react"
import {Form} from "react-redux-form"
import {formModel} from "utils/Util"
import DefaultFormButtons from 'components/DefaultFormButtons'
import Loading from 'components/Loading'
import GlobalError from 'components/GlobalError'
import Saving from 'components/Saving'

const EntityForm = ({
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
  form,
  FormFieldsComponent
}) => (
  <div>
    <Saving {...{saving}} />
    <Loading {...{loading}} />
    <GlobalError {...{globalError}}/>
    <Form {...{onSubmit}} model={formModel(entity)}>
      <FormFieldsComponent {...{form, entity}}/>
      <DefaultFormButtons {...{onReset, onCancel}}/>
    </Form>
  </div>
)
export default EntityForm