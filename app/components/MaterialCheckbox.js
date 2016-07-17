import React from 'react'
import {actions} from 'react-redux-form'
import {connect} from 'react-redux'
import Checkbox from 'material-ui/Checkbox'

@connect(s => ({}))
export default class MaterialCheckbox extends React.Component {

  render() {
    const {dispatch, model, modelValue} = this.props

    return <Checkbox
      onCheck={e => dispatch(actions.toggle(model))}
      checked={modelValue}
      {...this.props}
    />
  }

}