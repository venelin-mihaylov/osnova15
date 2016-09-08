import React from 'react'
import {autobind} from 'core-decorators'
import {getDisplayName} from 'recompose'
import _get from 'lodash.get'

export default function HasSelectionHOC({
  dataProp = 'redux.records',
  idProperty = 'id'
}) {

  return function HasSelectionHOC(Component) {
    return class HasSelectionHOC extends React.Component {

      static dataProp = dataProp
      static idProperty = idProperty
      static displayName = `HasSelectionHOC(${getDisplayName(Component)})`

      state = {
        selectedId: null,
        selectedRecord: null
      }

      @autobind
      withFirstSelection(callback) {
        const record = this.getFirstSelection()
        const idx = this.getSelectionIdx()
        if (!record) return

        return callback(record, idx)
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

      @autobind
      /**
       *
       * @returns {array}
       */
      getData() {
        return _get(this.props,this.constructor.dataProp)
      }

      @autobind
      getSelectionIdx() {
        const idProperty = this.constructor.idProperty
        const data = this.getData()
        const ret2 = this.getData().findIndex(r => {
          const ret = r[idProperty] === this.state.selectedId
          if(ret) {
            console.log(r)
          }
          return ret
        })
        return ret2
      }

      @autobind
      selectByIdx(idx) {
        if(idx < 0) return
        if(idx >= this.getData().length-1) return
        if(idx == this.getSelectionIdx()) return

        const r = this.getData()[idx]
        if(r) {
          this.onSelectionChange(r[this.constructor.idProperty], r)
        }
      }

      @autobind
      selectNext() {
        const idx = this.getSelectionIdx()
        this.selectByIdx(idx + 1)
      }

      @autobind
      selectPrev() {
        const idx = this.getSelectionIdx()
        this.selectByIdx(idx - 1)
      }

      @autobind
      addProps() {
        return {
          idProperty: this.constructor.idProperty,
          onSelectionChange: this.onSelectionChange,
          getFirstSelection:this.getFirstSelection,
          withFirstSelection: this.withFirstSelection,
          getSelectionIdx: this.getSelectionIdx,
          selectByIdx: this.selectByIdx,
          selectNext: this.selectNext,
          selectPrev: this.selectPrev,
          selectedId: this.state.selectedId
        }
      }

      render() {
        return <Component
          {...this.props}
          {...(this.addProps())}
        />
      }
    }
  }
}