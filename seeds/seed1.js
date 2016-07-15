exports.seed = function (knex, Promise) {

  function randInt(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
  }

  let arr = []


  arr.push(knex('match_exercise').del())
  arr.push(knex.raw('ALTER SEQUENCE tournament_id_seq RESTART WITH 1'))
  arr.push(knex('target').del())
  arr.push(knex.raw('ALTER SEQUENCE target_id_seq RESTART WITH 1'))
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


  for (let i = 0; i < 100; i++) {
    arr.push(knex('tournament').insert({name: 'tournament ' + i}))
  }

  const firstNames = ['Yavor', 'Georgi', 'Ivelin', 'Venelin', 'Petar']
  const lastNames = ['Mihaylov', 'Dobrev', 'Ivanov', 'Yasenov']
  let firstName, lastName, email
  for (let i = 0; i < 100; i++) {
    firstName = firstNames[randInt(0, firstNames.length - 1)]
    lastName = lastNames[randInt(0, lastNames.length - 1)]
    email = firstName + '@' + lastName + '.com'

    arr.push(knex('competitor').insert({firstName, lastName, email}))
  }


  for (let i = 0; i < 1000; i++) {
    arr.push(knex('matches').insert({
      name: 'match ' + i,
      tournamentId: randInt(1, 99)
    }))
  }

  arr.push(knex('match_competitor').del())
  for (let i = 0; i < 10000; i++) {
    arr.push(knex('match_competitor').insert({
      competitorId: randInt(1, 99),
      matchId: randInt(1, 999)
    }))
  }

  for (let i = 0; i < 10; i++) {
    arr.push(knex('exercise').insert({name: 'exercise ' + i}))
  }

  for (let i = 0; i < 100; i++) {
    arr.push(knex('match_exercise').insert({
      matchId: randInt(1, 10),
      exerciseId: randInt(1, 10)
    }))
  }

  for (let i = 0; i < 100; i++) {
    arr.push(knex('target').returning('id').insert({
      name: 'target ' + i
    }).then(function(arrTargetId) {
      return knex('target_zone').insert({
        targetId: arrTargetId[randInt(0, arrTargetId.length - 1)],
        name: 'target zone ' + randInt(0, 999999),
        score: randInt(0, 10)
      })
    }))
  }



  return Promise.join(
    knex('users').del(),
    knex('users').insert({email: 'v@v.com', password: '123asd'}),
    Promise.all(arr)
  )
}
