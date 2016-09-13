import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {mapAct, mapListStateToProps, formatCountry} from 'utils/Util'
import CRUDAct from 'constants/CRUDAct'

const entity = 'matchCompetitor'
const variation = '1'
@connect(mapListStateToProps(entity, variation), mapAct(entity, variation))
@autobind
export default class MatchCompetitorListContainer extends OsnovaListContainer {

  baseFilter() {
    return {
      matchId: {
        operator: '=',
        value: this.props.params.matchId
      }
    }
  }

  render() {
    return (<EntityList
      toolbarTitle='MatchCompetitors'
      columns={[{
        property: 'num',
        header: {
          label: 'num'
        },
        props: {
          width: 50
        }
      }, {
        property: 'competitor',
        header: {
          label: 'Country'
        },
        cell: {
          format: ({country}) => formatCountry(country)
        },
        props: {
          width: 200
        }
      }, {
        property: 'competitor',
        header: {
          label: 'Name'
        },
        cell: {
          format: ({firstName, lastName}) => `${firstName} ${lastName}`
        }
      }, {
        property: 'competitor',
        header: {
          label: 'email'
        },
        cell: {
          format: ({email}) => `${email}`
        }
      }, {
        property: 'squad',
        header: {
          label: 'Squad'
        },
        props: {
          width: 20
        }
      }, {
        property: 'gun',
        header: {
          label: 'Gun'
        },

      }, {
        property: 'caliber',
        header: {
          label: 'Caliber'
        },
        props: {
          width: 50
        }
      }, {
        property: 'team',
        header: {
          label: 'Team'
        },

      }, {
        property: 'notes',
        header: {
          label: 'Notes'
        },

      }, {
        property: 'disqualified',
        header: {
          label: 'DQ'
        },
        cell: {
          format: (v) => (v ? 'Yes' : 'No')
        },
        props: {
          width: 50
        }
      }, {
        property: 'feePaid',
        header: {
          label: 'Fee'
        },
        cell: {
          format: (v) => (v ? 'Yes' : 'No')
        },
        props: {
          width: 50
        }
      }]}
      {...this.props}
      {...(this.addProps())}
    />)
  }
}
