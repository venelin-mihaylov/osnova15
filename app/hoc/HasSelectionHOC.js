import React from 'react'
import {autobind} from 'core-decorators'
import {getDisplayName} from 'recompose'

export default function HasSelectionHOC(dataProp = 'data') {

  return function HasSelectionHOC(Component) {
    return class HasSelectionHOC extends React.Component {

      static dataProp = dataProp
      static displayName = `HasSelectionHOC(${getDisplayName(Component)})`

      state = {
        selectedId: null,
        selectedRecord: null
      }

      @autobind
      withFirstSelection(callback) {
        let record = this.getFirstSelection()
        if (!record) return

        return callback(record)
      }

      @autobind
      getFirstSelection() {
        if (!this.state.selectedId) return null
        return this.state.selectedRecord
      }

      @autobind
      onSelectionChange(id, record) {
        const isNew = this.state.selectedId != id

        this.setState({
          selectedId: isNew ? id : null,
          selectedRecord: isNew ? record : null
        })
      }

      render() {
        return <Component
          {...this.props}
          onSelectionChange={this.onSelectionChange}
          getFirstSelection={this.getFirstSelection}
          withFirstSelection={this.withFirstSelection}
          selectedId={this.state.selectedId}
        />
      }
    }
  }
}