import React from 'react'
import Toggle from 'material-ui/Toggle'
import {actions} from 'react-redux-form'
import {connect} from 'react-redux'

@connect(s => ({}))
export default class MaterialToggle extends React.Component {

  render() {
    const {dispatch, model, modelValue} = this.props

    return <Toggle
      onToggle={e => dispatch(actions.toggle(model))}
      toggled={modelValue}
      {...this.props}
    />
  }

}