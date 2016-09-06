import React from 'react'
import {connect} from 'react-redux'
import {autobind} from 'core-decorators'
import FKAct from 'constants/FKAct'
import {Dropdown, Button, Icon} from 'stardust'
import isFunction from 'lodash/isFunction'

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
  name,
}) => {
  const key = FKname || `FK${entity}${variation}`
  const redux = state[key][name] || {}
  return {redux}
})
@autobind
export default class FKSelect extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    redux: React.PropTypes.object,
    name: React.PropTypes.string,
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

  static defaultProps = {
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
    this.loadServerRecord(this.props.value)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      console.log(`loading data for ${nextProps.value}`)
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
      onFocus = () => {
      },
      ...rest,
    } = this.props

    return (<div style={{display: 'inline-block'}}>
      <Dropdown
        name={name}
        search
        selection
        loading={loading}
        text={valueRecord ? renderLabel(valueRecord) : this.state.searchText}
        options={renderList(records)}
        onSearchChange={(e, searchText) => {
          dispatch(act(FKAct.FK_LIST_REQUESTED, {name, listParams, searchText}))
          this.setState({
            searchText
          })
        }}
        onFocus={(e) => {
          if (isFunction(onFocus) && onFocus(e) === false) {
            return
          }
          const searchText = e.target.value // use the dom element to get the value
          dispatch(act(FKAct.FK_LIST_REQUESTED, {name, listParams, searchText}))
        }}
        {...rest}
        onChange={(e, value) => {
          onChange(value)
        }}
      />
      <Button className='icon'><Icon name='erase' /></Button>
    </div>)
  }
}
