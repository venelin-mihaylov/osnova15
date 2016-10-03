const a = () => (<div>
  <AutoField
    model='.name'
    label='name'
    type='string'
  />

  <AutoField
    model='.notes'
    label='notes'
    type='string'
  />

  <AutoField
    model='.sex'
    label='sex'
    type='enum'
    options={{
      1: 'male',
      2: 'female',
    }}
  />


  <Control
    model={model}
    validators={validators}
    mapProps={mapSuiProps[type]}
    updateOn={updateOn}
    ignore={ignore}
    component={Form.Field}
    controlProps={type === 'string' ? {
      label,
      control: Input
    } : {
      label,
      options,
      selection: true,
      control: Dropdown,
    }}
  />
  <Errors
    model={model}
    messages={messages}
  />

  class AutoField extends React.Component {

  render() {
  const {
  model,
  type,
  options,
  label
} = this.props

  return <div>Test</div>
}
}


</div>)