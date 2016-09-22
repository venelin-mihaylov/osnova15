import React from 'react'
import AutoFields from 'components/AutoFields'
import MatchCompetitorSchema from '../../../../universal/model/schema/MatchCompetitorSchema'
import MatchCompetitorRelations from '../../../../universal/model/relations/MatchCompetitorRelations'
import {Button, Icon} from 'stardust'

// after person create, we need to be able to get the latest created competitor
// i.e. add onCompetitorCreated

const MatchCompetitorFormFields = ({
  entity,
  onClickAddCompetitor,
  params: {matchId}
}) => (<div>
  <AutoFields
    {...{entity}}
    jsonSchema={MatchCompetitorSchema}
    relations={MatchCompetitorRelations}
    overrides={{
      matchId: {exclude: true},
      competitorId: {
        renderLabel: r => r && `${r.firstName} ${r.lastName}`,
        listParams: {
          filter: {
            belongsToMatch: {
              operator: '=',
              value: matchId
            }
          }
        },
        buttons: <Button className='icon' onClick={onClickAddCompetitor}><Icon name='add user' /></Button>
      }
    }}
  />
</div>)

MatchCompetitorFormFields.propTypes = {
  dispatch: React.PropTypes.func,
  entity: React.PropTypes.string,
  model: React.PropTypes.string,
  onClickAddCompetitor: React.PropTypes.func,
  resetForm: React.PropTypes.func,
  params: React.PropTypes.any,
}

export default MatchCompetitorFormFields
