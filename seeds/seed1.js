exports.seed = function (knex, Promise) {

  function randInt(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
  }

  function uniqueRandInt2(low1, high1, low2, high2, count) {
    let ret = []
    while (count(ret) < count) {
      ret[{
        idx1: randInt(low1, high1)
      }, {
        idx2: randInt(low2, high2)
      }] = true
    }
    const idx1 = Object.keys(ret)

  }

  let arr = []

  arr.push(knex('exercise_target').del())
  arr.push(knex.raw('ALTER SEQUENCE exercise_target_id_seq RESTART WITH 1'))
  arr.push(knex('target_zone').del())
  arr.push(knex.raw('ALTER SEQUENCE target_zone_id_seq RESTART WITH 1'))
  arr.push(knex('target').del())
  arr.push(knex.raw('ALTER SEQUENCE target_id_seq RESTART WITH 1'))
  arr.push(knex('match_exercise').del())
  arr.push(knex.raw('ALTER SEQUENCE match_exercise_id_seq RESTART WITH 1'))
  arr.push(knex('exercise').del())
  arr.push(knex.raw('ALTER SEQUENCE exercise_id_seq RESTART WITH 1'))
  arr.push(knex('match_competitor').del())
  arr.push(knex.raw('ALTER SEQUENCE match_competitor_id_seq RESTART WITH 1'))
  arr.push(knex('matches').del())
  arr.push(knex.raw('ALTER SEQUENCE matches_id_seq RESTART WITH 1'))
  arr.push(knex('competitor').del())
  arr.push(knex.raw('ALTER SEQUENCE competitor_id_seq RESTART WITH 1'))
  arr.push(knex('tournament').del())
  arr.push(knex.raw('ALTER SEQUENCE tournament_id_seq RESTART WITH 1'))

  for (let i = 0; i < 10; i++) {
    arr.push(knex('tournament').insert({name: 'tournament ' + i}))
  }

  const firstNames = ['Yavor', 'Georgi', 'Ivelin', 'Venelin', 'Petar']
  const lastNames = ['Mihaylov', 'Dobrev', 'Ivanov', 'Yasenov']
  let firstName, lastName, email
  for (let i = 0; i < 10; i++) {
    firstName = firstNames[randInt(0, firstNames.length - 1)]
    lastName = lastNames[randInt(0, lastNames.length - 1)]
    email = firstName + '@' + lastName + '.com'

    arr.push(knex('competitor').insert({firstName, lastName, email}))
  }


  for (let i = 0; i < 10; i++) {
    arr.push(knex('matches').insert({
      name: 'match ' + i,
      tournamentId: randInt(1, 9)
    }))
  }

  for (let i = 0; i < 100; i++) {
    arr.push(knex.raw('INSERT INTO match_competitor ("competitorId", "matchId") VALUES(?, ?) ON CONFLICT DO NOTHING', [randInt(1, 9), randInt(1, 9)]))
  }

  for (let i = 0; i < 10; i++) {
    arr.push(knex('exercise').insert({name: 'exercise ' + i}))
  }

  for (let i = 0; i < 100; i++) {
    arr.push(knex.raw('INSERT INTO match_exercise ("matchId", "exerciseId") VALUES(?, ?) ON CONFLICT DO NOTHING', [randInt(1, 9), randInt(1, 9)]))
  }

  for (let i = 0; i < 10; i++) {
    arr.push(knex('target').returning('id').insert({
      name: 'target ' + i
    }).then(ids => {
      for (let i = 0; i < 3; i++) {
        knex('target_zone').insert({
          targetId: ids[0],
          name: 'target zone ' + randInt(0, 999999),
          score: randInt(1, 10)
        })
      }
    }))
  }

  for (let i = 0; i < 10; i++) {
    arr.push(knex.raw('INSERT INTO exercise_target ("targetId", "exerciseId", distance, description) VALUES(?, ?, ?, ?) ON CONFLICT DO NOTHING', [randInt(1, 9), randInt(1, 9), randInt(1, 90), 'description ' + randInt(1, 90)]))
  }

  arr.push(knex('users').del())
  arr.push(knex('users').insert({email: 'v@v.com', password: '123asd'}))

  return Promise.all(arr)
}
