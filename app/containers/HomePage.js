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
import {Form as RRForm} from 'react-redux-form'
import {Button, Form, Input} from 'stardust'
import SUIField from 'components/SUIField'


export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (<div style={{marginRight: 10}}>
      <h1>Welcome back, Gringo!</h1>
      <RRForm className='ui form' model='tournamentModel' onSubmit={(model) => console.log(model)}>
        <Form.Fields evenlyDivided>
          <Form.Field label='Name'>
            <SUIField model='tournamentModel.name'>
              <Input />
            </SUIField>
          </Form.Field>
          <Form.Field label='Description'>
            <SUIField model='tournamentModel.description'>
              <Input />
            </SUIField>
          </Form.Field>
        </Form.Fields>
        <Button type='submit'>Submit</Button>
      </RRForm>
    </div>)
  }
}
