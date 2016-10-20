import React from 'react'
import {Form, Control} from 'react-redux-form'
import {Form as uiForm, Button, Input, Message} from 'semantic-ui-react'
import cx from 'classnames'

// const LoginForm = ({onSubmit}) => (<Form onSubmit={onSubmit}>
//   <Form.Input label='Email' name='email' />
//   <Form.Input label='Password' name='password' type='password' />
//   <Button type='submit'>Login</Button>
// </Form>)

const LoginForm = ({onSubmit, user: {loading, error}}) => (<Form
  className={cx({
    ui: true,
    form: true,
    loading,
    error: !!error,
  })}
  onSubmit={onSubmit}
  model='rrf.login'
>
  {error && (<Message
    error
    content={error}
  />)}
  <uiForm.Group>
    <div className='field'>
      <div className='label'>Email</div>
      <Control.text component={Input} model='rrf.login.email' />
    </div>
    <div className='field'>
      <div className='label'>Email</div>
      <Control.text component={Input} type='password' model='rrf.login.password' />
    </div>
  </uiForm.Group>

  <Button type='submit'>Login</Button>

</Form>)

LoginForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  user: React.PropTypes.any
}

export default LoginForm
