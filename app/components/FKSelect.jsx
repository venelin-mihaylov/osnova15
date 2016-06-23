import React from "react";
import {connect} from "react-redux";
import {autobind} from "core-decorators";
import AutoComplete from "material-ui/AutoComplete";
import IconButton from "material-ui/IconButton";
import {actions} from "react-redux-form";
import FKActionType from 'constants/FKActionType';

@connect((state, ownProps) => {
  return {
    redux: state[ownProps.FKname]
  }
})
@autobind
/**
 * @class FKSelect
 * Provides a foreign key select combo.
 * Keeps the current selection in redux-form
 * On load the current selection is passed down by redux-form via a value prop
 * {onChange,onBlur} a redux-form event handler is called, which gets the new value and saves it in redux-form
 */
export default class FKSelect extends React.Component {

  defaultProps = {
    redux: {
      records: []
    }
  };

  /**
   * @param props.dbTable
   * @param props.FKName
   * @param props.initialValue
   * @param props.labelField
   */
  constructor(props) {
    super(props);
    this.act = FKActionType.act(this.props.entity);
  }

  static propTypes = {
    /**
     * DB table
     */
    dbTable: React.PropTypes.string.isRequired,
    /**
     * The name of the foreign key in the redux store
     */
    FKname: React.PropTypes.string.isRequired,
    /**
     * Function to render the server data to a UI friendly format
     */
    renderRecords: React.PropTypes.func.isRequired,
    /**
     * value
     */
    modelValue: React.PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.modelValue != this.props.modelValue) {
      this.props.dispatch(act(FKActionType.FK_READ_REQUESTED, {id: this.props.modelValue}));
    }
  }

  componentWillmount() {
    this.props.dispatch(this.action.reset());
  }

  render() {

    const {
      dispatch,
      redux: {
        valueLabel,
        records
      },
      model,
      entity,
      onChange,
      ...rest
    } = this.props;
    const act = FKActionType.act(entity);

    return (
      <div>
        <AutoComplete
          openOnFocus={true}
          filter={AutoComplete.noFilter}
          searchText={valueLabel}
          dataSource={records}
          onUpdateInput={dispatch(act(FKActionType.FK_LIST_REQUESTED))}
          onNewRequest={(X, idx) => onChange(records[idx].id)}
          {...rest}
        />
        <IconButton iconClassName="fa fa-eraser" onClick={() => dispatch(actions.change(model, null))}/>
      </div>
    );
  }
}
