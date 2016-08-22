'use strict'
import React from 'react'
import {Form} from 'react-redux-form'
import {rrfModel} from 'utils/Util'
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
    record,
    globalError,
    fieldErrors,
    saving,
    loading,
    resetForm,
  },
  form,
  model,
  FormFieldsComponent,
  ...rest,
}) => (
  <div>
    <Saving {...{saving}} />
    <Loading {...{loading}} />
    <If condition={!loading}>
      <GlobalError {...{fieldErrors, globalError}} />
      <Form {...{onSubmit}} model={rrfModel(entity)}>
        <FormFieldsComponent {...{record, form, model, entity, dispatch, resetForm}} {...rest} />
        <DefaultFormButtons {...{onReset, onCancel}} />
      </Form>
    </If>
  </div>
)
export default EntityForm
