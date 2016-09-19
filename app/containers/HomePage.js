/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import {autobind} from 'core-decorators'
import {Form, Message, Button, Input} from 'stardust'

@autobind
export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super()
    this.state = {
      orderBy: null,
      orderDirection: null
    }
  }

  render() {
    return (<div style={{marginRight: 10}}>
      <h1>Welcome back, Gringo!</h1>
      <Form error>
        <Input label='Email' placeholder='joe@schmoe.com' className='error' />
        <Message
          error
          header='Action Forbidden'
          content='You can only sign up for an account once with a given e-mail address.'
        />
        <Message
          error
          header='Action Forbidden'
          content='You can only sign up for an account once with a given e-mail address.'
        />
        <Message
          error
          header='Action Forbidden'
          content='You can only sign up for an account once with a given e-mail address.'
        />
        <Button>Submit</Button>
      </Form>
    </div>)
  }
}
