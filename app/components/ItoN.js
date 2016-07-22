'use strict'
import React from 'react'
import {rrfField} from 'utils/Util'
import {actions} from 'react-redux-form'
import IconButton from 'material-ui/IconButton'

export default class ItoN extends React.Component {

  render() {
    const {
      model,
      relTitle,
      relName,
      dispatch,
      entity,
      renderRecord,
    } = this.props

    const relData = model[relName] || []
    const onAdd = () => dispatch(actions.push(rrfField(entity, `${relName}[]`), {}))
    const onDeleteByIndex = (idx) => dispatch(actions.remove(rrfField(entity, `${relName}[]`), idx))

    return <If condition={relData}>
      <fieldset style={{borderTop: '1px solid green', padding: '10px', width: '1000px'}}>
        <legend>
          <IconButton iconClassName='fa fa-plus' onClick={onAdd}/>
          <h2 style={{marginRight: '10px', display: 'inline'}}>{relTitle}</h2>
        </legend>
        {relData.map((row, idx) => renderRecord({
          row,
          idx,
          relName,
          onDeleteByIndex
        }))}
      </fieldset>
    </If>
  }

}