import React from 'react'
import {rrfField} from 'utils/Util'
import {actions} from 'react-redux-form'
import {Button, Icon} from 'semantic-ui-react'

const ItoNFieldSet = ({
  model,
  relTitle,
  relName,
  dispatch,
  entity,
  renderRecord,
  newRecord = {}
}) => {
  const relData = model[relName] || []
  const onAdd = (e) => {
    e.preventDefault()
    dispatch(actions.push(rrfField(entity, `${relName}[]`), newRecord))
  }
  const onDeleteByIndex = (idx) => dispatch(actions.remove(rrfField(entity, `${relName}[]`), idx))
  const onDeleteLast = (e) => {
    e.preventDefault()
    dispatch(actions.remove(rrfField(entity, `${relName}[]`), relData.length - 1))
  }

  if (!relData) {
    return null
  }

  return (<fieldset style={{borderTop: '1px solid green', padding: '10px', width: '100%'}}>
    <legend>
      <Button icon='add' onClick={onAdd} />
      <Button icon='minus' onClick={onDeleteLast} />
      <h2 style={{paddingRight: '20px', display: 'inline'}}>{relTitle}</h2>
    </legend>
    {relData && relData.map((row, idx) => renderRecord({
      row,
      idx,
      relName,
      onDeleteByIndex
    }))}
  </fieldset>)
}

ItoNFieldSet.propTypes = {
  model: React.PropTypes.object,
  relTitle: React.PropTypes.string,
  relName: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  entity: React.PropTypes.string,
  newRecord: React.PropTypes.any,
  renderRecord: React.PropTypes.func,
}

export default ItoNFieldSet
