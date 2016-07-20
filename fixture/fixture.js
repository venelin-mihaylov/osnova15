import sqlFixtures from 'sql-fixtures'
import dbConfig from '../api/config/db'

function generate(cnt, data) {
  let ret = []
  let r = {}

  const fields = Object.keys(data)
  for (let i = 0; i < cnt; i++) {
    r = {}
    fields.forEach(f => {
      if (typeof data[f] == 'function') {
        r[f] = data[f](i, r)
      } else {
        r[f] = data[f]
      }
    })
    ret.push(r)
  }
  return ret
}

function randInt(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

const firstNames = ['Yavor', 'Georgi', 'Ivelin', 'Venelin', 'Petar']
const lastNames = ['Mihaylov', 'Dobrev', 'Ivanov', 'Yasenov']

const dataSpec = {

  tournament: generate(10, {name: (i) => `Tournament ${i}`}),
  competitor: generate(10, {
    firstName: () => firstNames[randInt(0, firstNames.length - 1)],
    lastName: () => lastNames[randInt(0, lastNames.length - 1)],
    email: (i, r) => r.firstName + '@' + r.lastName + '.com'
  }),
  target: generate(10, {name: (i) => `Target ${i}`}),
  matches: generate(10, {
    name: (i) => `Match ${i}`,
    tournamentId:  (i) => `tournament:${i}`
  })
}

const options = {
  showWarning: true
}
sqlFixtures.create(dbConfig, dataSpec, options, function (err, result) {
  // at this point a row has been added to the users table
  console.log(err)
  console.log(result)
  process.exit()
})