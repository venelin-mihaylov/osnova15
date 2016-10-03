require('dotenv').config({silent: true})
import sqlFixtures from 'sql-fixtures'
import _range from 'lodash.range'
import _ from 'lodash'

/* eslint-disable prefer-template */

function generate(cnt, data) {
  return _range(cnt).map((i) => {
    const r = {}
    Object.keys(data).forEach(f => {
      if (typeof data[f] === 'function') {
        r[f] = data[f](i, r)
      } else {
        r[f] = data[f]
      }
    })
    return r
  })
}

function randInt(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}

function arrUniqRandInt(low, high, cnt) {
  const ret = {}
  _range(cnt).forEach(() => {
    ret[randInt(low, high)] = true
  })
  return Object.keys(ret)
}

function generateItoN(countOne, countManyMax, data) {
  return _.flatten(_range(countOne).map((parentIdx) => _range(randInt(1, countManyMax)).map((i) => {
    const record = {}
    Object.keys(data).forEach(field => {
      if (typeof data[field] === 'function') {
        record[field] = data[field]({i, field, record, parentIdx})
      } else {
        record[field] = data[field]
      }
    })
    return record
  })))
}

function generateNtoM(countN, countM, countNtoMMax, data) {
  return _.flatten(_range(0, countN).map((nIdx) => {
    const arrM = arrUniqRandInt(0, countM - 1, countNtoMMax)
    return arrM.map((mIdx) => {
      const record = {}
      Object.keys(data).forEach(field => {
        if (typeof data[field] === 'function') {
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
}

const dataSpec = {

  users: [{
    email: 'v@v.com',
    password: '123asd'
  }],
  tournament: generate(count.tournament, {
    name: (i) => `Tournament ${i}`,
    type: () => randInt(1, 2)
  }),
  competitor: generate(count.competitor, {
    firstName: () => firstNames[randInt(0, firstNames.length - 1)],
    lastName: () => lastNames[randInt(0, lastNames.length - 1)],
    email: (i, r) => r.firstName + '@' + r.lastName + '.com',
    country: 'bg',
    birthDate: new Date()
  }),
  target: generate(count.target, {
    name: (i) => `Target ${i}`,
    type: () => randInt(1, 2),
    favourite: () => randInt(0, 1)
  }),
  target_zone: generateItoN(count.target, count.target_zone_max, {
    targetId: ({parentIdx}) => `target:${parentIdx}`,
    name: ({i}) => `S${i}`,
    width: () => randInt(1, 10),
    height: () => randInt(1, 10),
  }),
  matches: generate(count.matches, {
    name: (i) => `Match ${i}`,
    tournamentId: () => `tournament:${randInt(0, count.tournament - 1)}`,
    discipline: () => randInt(1, 4),
    type: () => randInt(1, 2),
    country: 'bg'
  }),
  exercise: generate(count.exercise, {
    name: (i) => `Exercise ${i}`,
    minShots: () => randInt(1, 100),
    type: () => randInt(1, 2),
    module: () => randInt(1, 3),
    favourite: (i) => i === 1,
    matchId: (i, r) => {
      if (!r.favourite) {
        return `matches:${randInt(0, count.matches - 1)}`
      }
      return null
    }
  }),
  exercise_target: generateNtoM(count.exercise, count.target, count.exercise_target_max, {
    exerciseId: ({mIdx}) => `exercise:${mIdx}`,
    targetId: ({nIdx}) => `target:${nIdx}`,
    distance: () => randInt(1, 100),
    metric: () => randInt(1, 2),
    description: () => 'Exercise target ' + randInt(1, 100)
  }),
  match_competitor: generateNtoM(count.matches, count.competitor, count.match_competitor_max, {
    matchId: ({nIdx}) => `matches:${nIdx}`,
    competitorId: ({mIdx}) => `competitor:${mIdx}`,
    division: () => randInt(1, 3),
    caliber: '9mm',
    gun: 'colt XXL'
  })
}

const options = {
  showWarning: true
}

const dbConfig = {
  client: 'pg',
  connection: process.env.DATABASE_URL
}

sqlFixtures.create(dbConfig, dataSpec, options, function (err, result) {
  // at this point a row has been added to the users table
  console.log(err)
  // console.log(JSON.stringify(result, null, 2))
  process.exit()
})
