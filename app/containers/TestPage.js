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
import {Form as suiForm, Message, Button, Input} from 'stardust'
import {Form} from 'react-redux-form'
import AutoFields from 'components/AutoFields'

const TestSchema = {
  type: 'object',
  required: ['name'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string', minLength: 10, maxLength: 255},
    description: {type: ['string', 'null'], maxLength: 255},
    // type: {
    //   type: 'integer',
    //   enum: [1, 2],
    //   enumProps: {
    //     1: 'Test',
    //     2: 'Test 2'
    //   }
    // },
    // birthDate: {type: 'string', maxLength: 255, format: 'date', subtype: 'date'},
    // favourite: {type: 'boolean'},
    // tournamentId: {type: ['null', 'integer'], labelField: 'name'},
  }
}

const TestRelations = {
  tournament: {
    relation: 'BelongsToOne',
    modelClass: 'Tournament',
    join: {
      fromTable: 'matches',
      fromField: 'tournamentId',
      toTable: 'tournament',
      toField: 'id',
    }
  }
}

@autobind
export default class TestPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super()
    this.state = {
      orderBy: null,
      orderDirection: null
    }
  }

  onSubmit(model) {
    console.log(model)
  }

  render() {
    return (<div style={{marginRight: 10}}>
      <h1>Beware of buttons!</h1>
      <Form onSubmit={this.onSubmit}>
        <AutoFields
          entity='test'
          jsonSchema={TestSchema}
        />
      </Form>
    </div>)
  }
}
