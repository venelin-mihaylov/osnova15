import React from 'react'
import AutoFields from 'components/AutoFields'
import MatchCompetitorSchema from '../../../../universal/model/schema/MatchCompetitorSchema'
import MatchCompetitorRelations from '../../../../universal/model/relations/MatchCompetitorRelations'
import IconButton from 'material-ui/IconButton'

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
    glue={({name}) => <br key={`glue-${name}`} />}
    overrides={{
      matchId: {exclude: true},
      competitorId: {
        inputProps: {
          renderLabel: r => r && `${r.firstName} ${r.lastName}`,
          listParams: {
            filter: {
              belongsToMatch: {
                operator: '=',
                value: matchId
              }
            }
          },
          iconButtons: [<IconButton key='user-plus' iconClassName='fa fa-user-plus' onClick={onClickAddCompetitor} />]
        }
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
