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
  model,
  FormFieldsComponent,
  ...rest,
}) => (
  <div style={{paddingRight: '10px'}}>
    <Saving {...{saving}} />
    <Loading {...{loading}} />
    <If condition={!loading}>
      <GlobalError {...{fieldErrors, globalError}} />
      <Form className='ui form' {...{onSubmit}} model={rrfModel(entity)}>
        <FormFieldsComponent {...{record, model, entity, dispatch, resetForm}} {...rest} />
        <DefaultFormButtons {...{onReset, onCancel, saving, loading}} />
      </Form>
    </If>
  </div>
)
export default EntityForm
