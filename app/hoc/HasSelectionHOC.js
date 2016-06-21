import React from 'react';
import {autobind} from 'core-decorators';
import {getDisplayName} from 'recompose';

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
        if (!this.state.selectedId) return null
        return this.state.selectedRecord
      }

      @autobind
      onRowSelection(id, record) {
        this.setState({
          selectedId: id,
          selectedRecord: record
        });
      }

      render() {
        return <Component
          {...this.props}
          onRowSelection={this.onRowSelection}
          getFirstSelection={this.getFirstSelection}
          withFirstSelection={this.withFirstSelection}
          selectedId={this.state.selectedId}
          {...this.state}
        />
      }
    }
  }
};