import React from "react"
import {connect} from "react-redux"
import {autobind} from "core-decorators"
import AutoComplete from "material-ui/AutoComplete"
import IconButton from "material-ui/IconButton"
import {actions} from "react-redux-form"
import FKAct from 'constants/FKAct'

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
    },
    reset: true
  }

  /**
   * @param props.entity
   * @param props.FKName
   * @param props.initialValue
   * @param props.labelField
   */
  constructor(props) {
    super(props)
    this.act = FKAct.act(this.props.entity, this.props.variation)
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
     * field to use as label for the records. Use either labelField, or renderRecord
     */
    labelField: React.PropTypes.string,
    /**
     * Function to render the server data to a UI friendly format
     */
    renderList: React.PropTypes.func,
    /**
     * value
     */
    value: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    /**
     * labelField
     */
    renderRecord: React.PropTypes.func,
    /**
     * should we reset the store state, by default yes, start clean
     */
    reset: React.PropTypes.bool,
    /**
     * onChange(id, record)
     */
    onChange: React.PropTypes.func,
    listParams: React.PropTypes.object
  }

  loadServerRecord(id) {
    this.props.dispatch(this.act(FKAct.FK_READ_REQUESTED, {id}))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      this.loadServerRecord(nextProps.value)
    }
  }

  componentWillMount() {
    if(this.props.reset) {
      this.props.dispatch(this.act(FKAct.FK_RESET))
    }
    if(!this.props.redux.valueRecord) {
      this.loadServerRecord(this.props.value)
    }
  }

  render() {
    const act = this.act
    const {
      dispatch,
      redux: {
        recordById,
        records
      },
      labelField = 'id',
      renderRecord = (r={}) => r[labelField],
      renderList = (rs=[]) => rs.map(r => ({text: renderRecord(r), value: renderRecord(r)})),
      name,
      value,
      listParams,
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
          searchText={recordById[value] && renderRecord(recordById[value])}
          dataSource={renderList(records)}
          onUpdateInput={(searchText) => dispatch(act(FKAct.FK_LIST_REQUESTED, {listParams, searchText}))}
          onFocus={() => !records && dispatch(act(FKAct.FK_LIST_REQUESTED, {listParams}))}
          onNewRequest={(X, idx) => onChange(records[idx].id, records[idx])}
          {...rest}
        />
        <IconButton iconClassName="fa fa-eraser" onClick={() => {
          dispatch(act(FKAct.FK_CLEAR_SELECTION, value))
          name && dispatch(actions.change(name, null))
        }}/>
        {iconButtons.length ? iconButtons : null}
      </span>
    )
  }
}
