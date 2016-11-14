import React from 'react'
import {autobind} from 'core-decorators'
import {connect} from 'react-redux'
import EntityList from 'components/EntityList'
import OsnovaListContainer from 'components/OsnovaListContainer'
import {Icon} from 'semantic-ui-react'
import {mapAct, mapListStateToProps, formatCountry} from 'utils/Util'

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
          width: 100
        }
      }, {
        property: 'competitor',
        header: {
          label: 'Name'
        },
        cell: {
          format: ({firstName, lastName}) => `${firstName} ${lastName}`
        },
        props: {
          width: 150
        }
      }, {
        property: 'competitor',
        header: {
          label: 'email'
        },
        cell: {
          format: ({email}) => `${email}`
        },
        props: {
          width: 150
        }
      }, {
        property: 'squad',
        header: {
          label: 'Squad'
        },
        props: {
          width: 50
        }
      }, {
        property: 'gun',
        header: {
          label: 'Gun'
        },
        props: {
          width: 100
        }
      }, {
        property: 'caliber',
        header: {
          label: 'Caliber'
        },
        props: {
          width: 80
        }
      }, {
        property: 'team',
        header: {
          label: 'Team'
        },
        props: {
          width: 50
        }
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
          format: (v) => (v ? <Icon name='money' /> : null)
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
