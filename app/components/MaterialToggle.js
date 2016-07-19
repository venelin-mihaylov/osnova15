import React from 'react'
import Toggle from 'material-ui/Toggle'
import {actions} from 'react-redux-form'
import {connect} from 'react-redux'

@connect(s => ({}))
export default class MaterialToggle extends React.Component {

  render() {
    const {dispatch, name, onChange, checked} = this.props

    return <Toggle
      onToggle={e => {
        onChange(!checked)
      }}
      toggled={checked}
      {...this.props}
    />
  }

}