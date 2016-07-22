import sqlFixtures from 'sql-fixtures'
import dbConfig from '../api/config/db'
import _range from 'lodash.range'
import _ from 'lodash'

function generate(cnt, data) {
  return _range(cnt).map((i) => {
    let r = {}
    Object.keys(data).forEach(f => {
      if (typeof data[f] == 'function') {
        r[f] = data[f](i, r)
      } else {
        r[f] = data[f]
      }
    })
    return r
  })
}

function randInt(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

function arrUniqRandInt(low, high, cnt) {
  let ret = {}
  _range(cnt).forEach(() => ret[randInt(low, high)] = true)
  return Object.keys(ret)
}

function generateItoN(countOne, countManyMax, data) {
  return _.flatten(_range(countOne).map((parentIdx) => {
    return _range(randInt(1, countManyMax)).map((i) => {
      let record = {}
      Object.keys(data).forEach(field => {
        if (typeof data[field] == 'function') {
          record[field] = data[field]({i, field, record, parentIdx})
        } else {
          record[field] = data[field]
        }
      })
      return record
    })
  }))
}

function generateNtoM(countN, countM, countNtoMMax, data) {
  return _.flatten(_range(0, countN).map((nIdx) => {
    const arr = arrUniqRandInt(0, countM - 1, countNtoMMax)
    return _range(arr.length).map((mIdx) => {
      let record = {}
      Object.keys(data).forEach(field => {
        if (typeof data[field] == 'function') {
          record[field] = data[field]({nIdx, mIdx, field, record})
        } else {
          record[field] = data[field]
        }
      })
      return record
    })
  }))
}

const firstNames = ['Yavor', 'Georgi', 'Ivelin', 'Venelin', 'Petar']
const lastNames = ['Mihaylov', 'Dobrev', 'Ivanov', 'Yasenov']

const count = {
  tournament: 10,
  competitor: 20,
  target: 10,
  target_zone_max: 5, // per target
  matches: 10,
  match_competitor_max: 5, // per match
  exercise: 10,
  exercise_target_max: 5,
  match_exercise_max: 5
}

const dataSpec = {

  tournament: generate(count.tournament, {
    name: (i) => `Tournament ${i}`
  }),
  competitor: generate(count.competitor, {
    firstName: () => firstNames[randInt(0, firstNames.length - 1)],
    lastName: () => lastNames[randInt(0, lastNames.length - 1)],
    email: (i, r) => r.firstName + '@' + r.lastName + '.com'
  }),
  target: generate(count.target, {
    name: (i) => `Target ${i}`
  }),
  target_zone: generateItoN(count.target, count.target_zone_max, {
    targetId: ({parentIdx}) => `target:${parentIdx}`,
    name: () => 'Zone ' + randInt(1, 100),
    score: () => randInt(1, 100)
  }),
  exercise: generate(count.exercise, {
    name: (i) => `Exercise ${i}`
  }),
  exercise_target: generateNtoM(count.exercise, count.target, count.exercise_target_max, {
    exerciseId: ({mIdx}) => `exercise:${mIdx}`,
    targetId: ({nIdx}) => `target:${nIdx}`,
    distance: () => randInt(1, 100),
    description: () => 'Exercise target ' + randInt(1, 100)
  }),
  matches: generate(count.matches, {
    name: (i) => `Match ${i}`,
    tournamentId: () => `tournament:${randInt(0, count.tournament-1)}`
  }),
  match_competitor: generateNtoM(count.matches, count.competitor, count.match_competitor_max, {
    matchId: ({nIdx}) => `matches:${nIdx}`,
    competitorId: ({mIdx}) => `competitor:${mIdx}`
  }),
  match_exercise: generateNtoM(count.matches, count.exercise, count.match_competitor_max, {
    matchId: ({nIdx}) => `matches:${nIdx}`,
    exerciseId: ({mIdx}) => `exercise:${mIdx}`
  }),

}

const options = {
  showWarning: true
}

sqlFixtures.create(dbConfig, dataSpec, options, function (err, result) {
  // at this point a row has been added to the users table
  console.log(err)
  console.log(JSON.stringify(result, null, 2))
  process.exit()
})