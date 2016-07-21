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

const firstNames = ['Yavor', 'Georgi', 'Ivelin', 'Venelin', 'Petar']
const lastNames = ['Mihaylov', 'Dobrev', 'Ivanov', 'Yasenov']

const count = {
  tournament: 10,
  competitor: 10,
  target: 10,
  matches: 10,
  match_competitor_max: 5, // per match
}

const dataSpec = {

  tournament: generate(count.tournament, {name: (i) => `Tournament ${i}`}),
  competitor: generate(count.competitor, {
    firstName: () => firstNames[randInt(0, firstNames.length - 1)],
    lastName: () => lastNames[randInt(0, lastNames.length - 1)],
    email: (i, r) => r.firstName + '@' + r.lastName + '.com'
  }),
  target: generate(count.target, {name: (i) => `Target ${i}`}),
  target_zone: _.flatten(_range(count.target, (targetIdx) => {

  })),
  exercise: generate(count.exercise, {name: (i) => `Exercise ${i}`}),
  matches: generate(count.matches, {
    name: (i) => `Match ${i}`,
    tournamentId:  () => `tournament:${randInt(1, count.tournament)}`
  }),
  // match_competitor: _range(0, count.matches).map((matchIdx) => {
  //   const arr = arrUniqRandInt(0, count.competitor-1, count.match_competitor_max)
  //   return generate(arr.length, {
  //     matchId: `matches:${matchIdx}`,
  //     competitorId: (i) => `competitor:${arr[i-1]}`
  //   })
  // })
}

console.log(JSON.stringify(dataSpec.match_competitor, null, 2))

const options = {
  showWarning: true
}
sqlFixtures.create(dbConfig, dataSpec, options, function (err, result) {
  // at this point a row has been added to the users table
  console.log(err)
  console.log(result)
  process.exit()
})