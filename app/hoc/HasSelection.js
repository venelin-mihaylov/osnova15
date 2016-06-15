export var HasSelection = Component => class extends React.Component {

  state = {
    selection: []
  };

  constructor() {

  }

  withFirstSelectedRecord(cb) {
    let record = this.getFirstSelectedRecord();
    if (!record) return;

    return cb(record);
  }

  getFirstSelectedRecord() {
    if (!this.state.selection.length) return null;

    let idx = this.state.selection[0];
    return data[idx];
  }

  onRowSelection(selection) {
    this.state.selection = selection;
  }
}