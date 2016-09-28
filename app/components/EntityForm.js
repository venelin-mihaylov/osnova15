import React from 'react'
import {Form} from 'react-redux-form'
import {rrfModel} from 'utils/Util'
import DefaultFormButtons from 'components/DefaultFormButtons'
import Loading from 'components/Loading'
import GlobalError from 'components/GlobalError'
import Saving from 'components/Saving'
import cx from 'classnames'

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
}) => (<div style={{paddingRight: '10px'}}>
  <Saving {...{saving}} />
  <GlobalError {...{fieldErrors, globalError}} />
  <Form
    className={cx({
      ui: true,
      form: true,
      error: false,
      loading
    })}
    model={rrfModel(entity)}
    {...{onSubmit}}
  >
    <FormFieldsComponent {...{record, model, entity, dispatch, resetForm}} {...rest} />
    <DefaultFormButtons {...{onReset, onCancel, saving, loading}} />
  </Form>
</div>)

EntityForm.propTypes = {
  dispatch: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  onReset: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  entity: React.PropTypes.string,
  redux: React.PropTypes.object,
  model: React.PropTypes.any,
  FormFieldsComponent: React.PropTypes.any
}

export default EntityForm
