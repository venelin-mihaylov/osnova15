import React from 'react'
import {rrfField} from 'utils/Util'
import {actions} from 'react-redux-form'
import {Button, Icon} from 'stardust'

const ItoNFieldSet = ({
  model,
  relTitle,
  relName,
  dispatch,
  entity,
  renderRecord,
}) => {
  const relData = model[relName] || []
  const onAdd = () => dispatch(actions.push(rrfField(entity, `${relName}[]`), {}))
  const onDeleteByIndex = (idx) => dispatch(actions.remove(rrfField(entity, `${relName}[]`), idx))
  const onDeleteLast = () => dispatch(actions.remove(rrfField(entity, `${relName}[]`), relData.length - 1))

  return <If condition={relData}>
    <fieldset style={{borderTop: '1px solid green', padding: '10px', width: '100%'}}>
      <legend>
        <Button className='icon' onClick={onAdd}><Icon name='add' /></Button>
        <Button className='icon' onClick={onDeleteLast}><Icon name='minus' /></Button>
        <h2 style={{paddingRight: '20px', display: 'inline'}}>{relTitle}</h2>
      </legend>
      {relData && relData.map((row, idx) => renderRecord({
        row,
        idx,
        relName,
        onDeleteByIndex
      }))}
    </fieldset>
  </If>
}

ItoNFieldSet.propTypes = {
  model: React.PropTypes.object,
  relTitle: React.PropTypes.string,
  relName: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  entity: React.PropTypes.string,
  renderRecord: React.PropTypes.func,
}

export default ItoNFieldSet
