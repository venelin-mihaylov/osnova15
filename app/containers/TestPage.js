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
import {Form, Control, controls} from 'react-redux-form'
import AutoFields from 'components/AutoFields'
import {rrfModel} from 'utils/Util'
import CountrySelect from 'components/CountrySelect'
import FileField from 'components/FileField'

const TestSchema = {
  type: 'object',
  required: ['name'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string', minLength: 10, maxLength: 255},
    description: {type: ['string', 'null'], maxLength: 255},
    type: {
      type: 'integer',
      enum: [1, 2],
      enumProps: {
        1: 'Test',
        2: 'Test 2'
      }
    },
    birthDate: {type: 'string', maxLength: 255, format: 'date', subtype: 'date'},
    favourite: {type: 'boolean'},
    tournamentId: {type: ['null', 'integer'], labelField: 'name'},
    country: {type: 'string', maxLength: 255},
    image: {type: 'string'}
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
      <Form className='ui form' onSubmit={this.onSubmit} model={rrfModel('test')}>
        {AutoFields.renderFields({
          entity: 'test',
          jsonSchema: TestSchema,
          relations: TestRelations,
          overrides: {
            country: {
              control: CountrySelect,
              rrfProps: {
                updateOn: 'change',
                mapProps: AutoFields.mapPropsDropdown
              }
            },
            image: {
              control: FileField,
              accept: '.png,.jpg',
              label: 'Target Image'
            }
          }
        })}
        <Button type='submit'>Submit</Button>
      </Form>
    </div>)
  }
}
