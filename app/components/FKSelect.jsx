import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import AutoComplete from "material-ui/AutoComplete"
import IconButton from "material-ui/IconButton"
import {actions} from "react-redux-form"
import FKActionType from 'constants/FKActionType'

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
  }

  /**
   * @param props.entity
   * @param props.FKName
   * @param props.initialValue
   * @param props.labelField
   */
  constructor(props) {
    super(props)
    this.act = FKActionType.act(this.props.entity, this.props.variation)
  }

  static propTypes = {
    /**
     * DB table
     */
    entity: React.PropTypes.string.isRequired,
    /**
     * variation
     */
    variation: React.PropTypes.string.isRequired,
    /**
     * The name of the foreign key in the redux store
     */
    FKname: React.PropTypes.string.isRequired,
    /**
     * Function to render the server data to a UI friendly format
     */
    renderRecords: React.PropTypes.func,
    /**
     * value
     */
    modelValue: React.PropTypes.number,
    /**
     * labelField
     */
    labelField: React.PropTypes.string.isRequired,
    /**
     * onChange(id, record)
     */
    onChange: React.PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
    console.log(this.props.modelValue)
    console.log(nextProps.modelValue)
    console.log(nextProps.redux.valueLabel)
    if (nextProps.modelValue != this.props.modelValue) {
      this.props.dispatch(this.act(FKActionType.FK_READ_REQUESTED, {
        id: nextProps.modelValue,
        labelField: this.props.labelField
      }))
    }
  }

  componentWillMount() {
    this.props.dispatch(this.act(FKActionType.FK_RESET))
  }

  render() {
    const act = this.act
    const {
      dispatch,
      redux: {
        valueLabel,
        records,
        renderedRecords
      },
      labelField,
      renderRecords = (rs=[]) => rs.map(r => {
        return {text: r[labelField], value: r[labelField]}
      }),
      model,
      onChange,
      iconButtons = [],
      ...rest
    } = this.props

    return (
      <span>
        <AutoComplete
          style={{width: 220 - iconButtons.length * 50}}
          openOnFocus={true}
          filter={AutoComplete.noFilter}
          searchText={valueLabel}
          dataSource={renderedRecords}
          onUpdateInput={() => dispatch(act(FKActionType.FK_LIST_REQUESTED, {renderRecords}))}
          onFocus={() => dispatch(act(FKActionType.FK_LIST_REQUESTED, {renderRecords}))}
          onNewRequest={(X, idx) => onChange(records[idx].id, records[idx])}
          {...rest}
        />
        <IconButton iconClassName="fa fa-eraser" onClick={() => {
          dispatch(act(FKActionType.FK_CLEAR_SELECTION))
          model && dispatch(actions.change(model, null))
        }}/>
        {iconButtons.length ? iconButtons : null}
      </span>
    )
  }
}
