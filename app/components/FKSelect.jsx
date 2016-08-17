import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import AutoComplete from 'material-ui/AutoComplete'
import IconButton from 'material-ui/IconButton'
import {actions} from 'react-redux-form'
import FKAct from 'constants/FKAct'

/**
 * Provides a foreign key select combo.
 * Keeps the current selection in react-redux-form
 * On load the current selection is passed down by react-redux-form via a value prop
 * {onChange,onBlur} a redux-form event handler is called, which gets the new value and saves it in redux-form
 */
@connect((state, {
  FKname,
  entity,
  variation = '1',
}) => {
  const key = FKname || `FK${entity}${variation}`
  const redux = state[key]
  if (!redux) throw new Error(`Bad FKname for FKSelect: ${key}`)
  return {redux}
})
@autobind
export default class FKSelect extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    redux: React.PropTypes.object,
    iconButtons: React.PropTypes.arrayOf(React.PropTypes.object),
    /**
     * DB table
     */
    entity: React.PropTypes.string.isRequired,
    /**
     * variation
     */
    variation: React.PropTypes.string,
    /**
     * The name of the foreign key in the redux store
     */
    FKname: React.PropTypes.string,
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
    renderLabel: React.PropTypes.func,
    /**
     * should we reset the store state, by default yes, start clean
     */
    reset: React.PropTypes.bool,
    /**
     * onChange(id, record)
     */
    onChange: React.PropTypes.func,
    /**
     * onFocus
     */
    onFocus: React.PropTypes.func,
    /**
     * server request base params
     */
    listParams: React.PropTypes.object,
  }

  defaultProps = {
    redux: {
      records: [],
    },
    variation: '1',
    reset: true,
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

  componentWillMount() {
    if (this.props.reset) {
      this.props.dispatch(this.act(FKAct.FK_RESET))
    }
    if (!this.props.redux.valueRecord) {
      this.loadServerRecord(this.props.value)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.loadServerRecord(nextProps.value)
    }
  }

  loadServerRecord(id) {
    const name = this.props.name
    this.props.dispatch(this.act(FKAct.FK_READ_REQUESTED, {id, name}))
  }

  render() {
    const act = this.act
    const {
      dispatch,
      redux: {
        recordByFieldName,
        records,
      },
      labelField = 'id',
      renderLabel = (r = {}) => r[labelField],
      renderList = (rs = []) => rs && rs.map(r => ({text: renderLabel(r), value: renderLabel(r)})),
      name,
      listParams,
      onChange = () => {},
      iconButtons = [],
      onFocus = () => {},
      ...rest,
    } = this.props

    return (
      <span>
        <AutoComplete
          style={{width: 220 - iconButtons.length * 50}}
          openOnFocus
          filter={AutoComplete.noFilter}
          searchText={recordByFieldName[name] && renderLabel(recordByFieldName[name])}
          dataSource={renderList(records)}
          onUpdateInput={(searchText) => dispatch(act(FKAct.FK_LIST_REQUESTED, {listParams, searchText}))}
          onFocus={(e) => {
            if (typeof onFocus === 'function') {
              if (onFocus(e) === false) {
                return
              }
            }
            e.target.select()
            const searchText = e.target.value // use the dom element to get the value
            dispatch(act(FKAct.FK_LIST_REQUESTED, {listParams, searchText}))
          }}
          onNewRequest={(X, idx) => onChange(records[idx].id, records[idx])}
          {...rest}
        />
        <IconButton
          iconClassName="fa fa-eraser"
          onClick={() => {
            dispatch(act(FKAct.FK_CLEAR_SELECTION, name))
            if (name) dispatch(actions.change(name, null))
          }}
        />
        {iconButtons.length ? iconButtons : null}
      </span>
    )
  }
}
