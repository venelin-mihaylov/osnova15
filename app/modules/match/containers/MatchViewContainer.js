import React from 'react'
import OsnovaViewContainer from 'components/OsnovaViewContainer'
import {mapAct, mapCrudStateToProps, formatEnum2, countryName} from 'utils/Util'
import {connect} from 'react-redux'
import {List, Label, Header, Flag} from 'semantic-ui-react'
import MatchSchema from '../../../../universal/model/schema/MatchSchema'
import moment from 'moment'


const entity = 'match'
const variation = '1'

@connect(mapCrudStateToProps(entity, variation), mapAct(entity, variation))
export default class MatchDetailContainer extends OsnovaViewContainer {
  render() {
    const {
      redux: {
        loading,
        record
      }
    } = this.props

    if (loading) {
      return <div>Loading ...</div>
    }

    if (!record) {
      // we should not get here ...
      return <div>...</div>
    }

    return (<div>
      <Header as='h2' textAlign='center'>{record.name}</Header>
      <Header as='h3' textAlign='center'><Flag name={record.country} /> {countryName(record.country)}</Header>
      <p style={{fontSize: '120%'}}>
        {record.description && record.description.split(/\n/).map((r, idx) => <span key={idx}>{r} <br /></span>)}
      </p>

      <List divided selection size='big'>
        <List.Item>
          <Label color='green' horizontal>Start - End</Label>
          {moment(record.startDate).format('MMMM Do YYYY')} - {moment(record.endDate).format('MMMM Do YYYY')}
        </List.Item>
        <List.Item>
          <Label color='green' horizontal>Discipline</Label>
          {formatEnum2(MatchSchema, 'discipline', record.discipline)}
        </List.Item>
        <List.Item>
          <Label color='green' horizontal>Type</Label>
          {formatEnum2(MatchSchema, 'type', record.type)}
        </List.Item>
        <List.Item>
          <Label color='green' horizontal>Organizer</Label>
          {record.organizer}
        </List.Item>
        <List.Item>
          <Label color='green' horizontal>Range Master</Label>
          {record.rangeMaster}
        </List.Item>
        <List.Item>
          <Label color='green' horizontal>Stat Master</Label>
          {record.statMaster}
        </List.Item>
        <List.Item>
          <Label color='green' horizontal>Match Director</Label>
          {record.matchDirector}
        </List.Item>
      </List>
    </div>)
  }
}
