import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import FKAct from 'constants/FKAct'
import {Dropdown, Button, Icon} from 'stardust'
import isFunction from 'lodash/isFunction'
import {fkStatePath, mapActFromProps, toArray} from 'utils/Util'
import curryRight from 'lodash/curryRight'


/**
 * Provides a foreign key select combo.
 * Keeps the current selection in react-redux-form
 * On load the current selection is passed down by react-redux-form via a value prop
 * {onChange,onBlur} a redux-form event handler is called, which gets the new value and saves it in redux-form
 */
@connect((state, ownProps) => {
  const {
    entity,
    variation,
    name,
    addState,
  } = ownProps
  const redux = state[fkStatePath(entity, variation)][name] || {}
  if (!redux) {
    throw new Error(`No state for ${entity}:${variation}`)
  }
  return {
    redux,
    ...(addState ? addState(state, ownProps) : {})
  }
}, mapActFromProps)
@autobind
export default class FKSelect extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    act: React.PropTypes.func,
    promiseAct: React.PropTypes.func,
    redux: React.PropTypes.object,
    name: React.PropTypes.string,
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
    /**
     * Buttons to render after the dropdown
     */
    buttons: React.PropTypes.any,
    /**
     * Callback to exercute after a record is loaded
     */
    postLoadRecord: React.PropTypes.func,
    /**
     * callback to add additional state
     */
    addState: React.PropTypes.func,
  }

  static defaultProps = {
    redux: {
      records: [],
    },
    variation: '1',
    reset: true,
    postLoadRecord: () => {},
    addState: () => {}
  }

  /**
   * @param props.entity
   * @param props.FKName
   * @param props.initialValue
   * @param props.labelField
   */
  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }

  componentWillMount() {
    this.setState({
      searchText: ''
    })
    // if (this.props.reset) {
    // this.props.dispatch(this.act(FKAct.FK_RESET, {name: this.props.name}))
    // }
    this.loadRecord(this.props.value)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.loadRecord(nextProps.value)
    }
  }

  loadRecord(id) {
    const name = this.props.name
    this.props.promiseAct(FKAct.FK_READ_REQUESTED, {id, name})
      .then(curryRight(this.props.postLoadRecord)(this))
  }


  render() {
    const {
      redux: {
        loading,
        valueRecord,
        records,
      },
      labelField = 'id',
      renderLabel = (r = {}) => r[labelField],
      renderList = (rs = []) => rs && rs.map(r => ({text: renderLabel(r), value: r.id})),
      name,
      listParams,
      onChange,
      onFocus = () => {},
      buttons = [],
      ...rest,
    } = this.props

    return (<span>
      <Dropdown
        name={name}
        search
        selection
        selectOnBlur={false}
        loading={loading}
        text={valueRecord ? renderLabel(valueRecord) : this.state.searchText}
        options={renderList(records)}
        onSearchChange={(e, searchText) => {
          this.props.promiseAct(FKAct.FK_LIST_REQUESTED, {name, listParams, searchText})
          this.setState({
            searchText
          })
        }}
        onFocus={(e) => {
          if (isFunction(onFocus) && onFocus(e) === false) {
            return
          }
          const searchText = e.target.value // use the dom element to get the value
          this.props.promiseAct(FKAct.FK_LIST_REQUESTED, {name, listParams, searchText})
        }}
        {...rest}
        onChange={(e, value) => {
          onChange(value)
        }}
      />
      {buttons}
    </span>)
  }
}
