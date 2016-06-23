import sqlFixtures from 'sql-fixtures'
import dbConfig from '../api/config/db'

const dataSpec = {
  tournament: []
}

for(var i = 0; i < 50; i++) {
  dataSpec.tournament.push({
    name: 'test' + i
  })
}

sqlFixtures.create(dbConfig, dataSpec, function(err, result) {
  // at this point a row has been added to the users table
  console.log(result)
  process.exit()
})