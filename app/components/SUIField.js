import React from 'react' // eslint-disable-line
import {createFieldClass, controls} from 'react-redux-form'
import {Input} from 'stardust'

const SUIField = createFieldClass({
  Input: controls.text,
}, {
  componentMap: {
    Input,
  }
})

export default SUIField
