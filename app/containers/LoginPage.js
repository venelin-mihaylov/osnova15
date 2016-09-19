import React from 'react'
import {connect} from 'react-redux'
import Act from 'constants/Act'
import LoginForm from 'components/LoginForm'

const LoginPage = ({dispatch, ...rest}) => <div>
  <h1>Login</h1>
  <LoginForm
    onSubmit={(model) => {
      console.log('model')
      console.log(model)
      dispatch({type: Act.LOGIN_USER_REQUESTED, ...model})
    }}
    {...rest}
  />
</div>

LoginPage.propTypes = {
  dispatch: React.PropTypes.func
}

export default connect(state => ({user: state.user}))(LoginPage)
