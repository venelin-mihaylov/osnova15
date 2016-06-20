import React from 'react';
import {autobind} from 'core-decorators';
import {getDisplayName} from 'recompose';
import _get from 'lodash.get';

export default function HasSelectionHOC(dataProp = 'data') {

  return function HasSelectionHOC(Component) {
    return class HasSelectionHOC extends React.Component {

      static dataProp = dataProp;

      static displayName = `HasSelectionHOC(${getDisplayName(Component)})`;

      state = {
        selectedId: null,
        selectedRecord: null
      };

      @autobind
      withFirstSelection(callback) {
        let record = this.getFirstSelection();
        if (!record) return;

        return callback(record);
      }

      @autobind
      getFirstSelection() {
        if (!this.state.selectedId) return null;

        let idx = this.state.selectedId[0];
        const data = _get(this.props, this.constructor.dataProp);
        return data[idx];
      }

      @autobind
      onRowSelection(id, record) {
        console.log(id);
        this.state.selectedId = id;
        this.state.selectedRecord = record;
      }

      render() {
        return <Component
          {...this.props}
          onRowSelection={this.onRowSelection}
          getFirstSelection={this.getFirstSelection}
          withFirstSelection={this.withFirstSelection}
          {...this.state}
        />
      }
    }
  }
};