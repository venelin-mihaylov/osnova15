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
    renderList: React.PropTypes.func,
    /**
     * value
     */
    value: React.PropTypes.string,
    /**
     * labelField
     */
    renderRecord: React.PropTypes.func,
    /**
     * onChange(id, record)
     */
    onChange: React.PropTypes.func.isRequired,
  }

  loadServerRecord(id) {
    this.props.dispatch(this.act(FKActionType.FK_READ_REQUESTED, {id}))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      this.loadServerRecord(nextProps.value)
    }
  }

  componentWillMount() {
    this.props.dispatch(this.act(FKActionType.FK_RESET))
    if(!this.props.redux.valueRecord) {
      this.loadServerRecord(this.props.value)
    }
  }

  render() {
    const act = this.act
    const {
      dispatch,
      redux: {
        valueRecord,
        records
      },
      labelField,
      renderRecord = r => r[labelField],
      renderList = (rs=[]) => rs.map(r => {
        return {text: renderRecord(r), value: renderRecord(r)}
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
          searchText={renderRecord(valueRecord)}
          dataSource={renderList(records)}
          onUpdateInput={() => dispatch(act(FKActionType.FK_LIST_REQUESTED))}
          onFocus={() => dispatch(act(FKActionType.FK_LIST_REQUESTED))}
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
