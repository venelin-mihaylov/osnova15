
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(t) {
      t.increments('id').primary()
      t.string('email').notNullable()
      t.string('password').notNullable()
    }),
    knex.schema.createTable('competitor', function(t) {
      t.increments('id').primary()
      t.string('globalId')
      t.string('firstName').notNullable()
      t.string('lastName').notNullable()
      t.string('nickName')
      t.date('birthDate').notNullable()
      t.string('email').notNullable()
      t.string('phone')
      t.string('country').notNullable()
      t.string('club')
    }),
    knex.schema.createTable('tournament', function(t) {
      t.increments('id').primary()
      t.string('name').notNullable()
      t.string('description')
      t.jsonb('notes')
    }),
    knex.schema.createTable('matches', function(t) {
      t.increments('id').primary()
      t.string('name').notNullable()
      t.string('description')
      t.integer('discipline')
      t.integer('type')
      t.date('startDate')
      t.date('endDate')
      t.string('organizer')
      t.string('country')
      t.string('rangeMaster')
      t.string('statMaster')
      t.string('matchDirector')
      t.integer('countCompetitors')
      t.integer('countExercises')
      t.integer('countSquads')
      t.integer('minShots')
      t.integer('tournamentId').references('id').inTable('tournament').onDelete('CASCADE')
    }),
    knex.schema.createTable('match_competitor', function(t) {
      t.increments('id').primary()
      t.integer('matchId').notNullable().references('id').inTable('matches').onDelete('CASCADE')
      t.integer('competitorId').notNullable().references('id').inTable('competitor').onDelete('CASCADE')
      t.integer('num')
      t.integer('squad')
      t.integer('division')
      t.decimal('caliber')
      t.string('gun')
      t.string('team')
      t.boolean('gunChecked')
      t.boolean('feePaid')
      t.boolean('disqualified').notNullable().default(false)
      t.string('notes')
      t.unique(['matchId', 'competitorId'])
    }),
    knex.schema.createTable('exercise', function(t) {
      t.increments('id').primary()
      t.string('name')
      t.integer('minShots')
      t.integer('type')
      t.integer('module')
      t.string('rangeOfficer')
      t.string('index')
      t.string('signature')
      t.boolean('favourite').notNullable().default(false)

    }),
    knex.schema.createTable('match_exercise', function(t) {
      t.increments('id').primary()
      t.integer('matchId').notNullable().references('id').inTable('matches').onDelete('CASCADE')
      t.integer('exerciseId').notNullable().references('id').inTable('exercise').onDelete('CASCADE')
      t.unique(['matchId', 'exerciseId'])
    }),
    knex.schema.createTable('target', function(t) {
      t.increments('id').primary()
      t.string('name').notNullable()
      t.integer('type') // valueMap
      t.boolean('favourite').notNullable().default(false)
      t.text('image') //base64 image data, easiest to handle


    }),
    knex.schema.createTable('target_zone', function(t) {
      t.increments('id').primary()
      t.string('name').notNullable()
      t.decimal('width').notNullable()
      t.decimal('height').notNullable()
      t.integer('targetId').notNullable().references('id').inTable('target').onDelete('CASCADE')
    }),
    knex.schema.createTable('exercise_target', function(t) {
      t.increments('id').primary()
      t.integer('exerciseId').notNullable().references('id').inTable('exercise').onDelete('CASCADE')
      t.integer('targetId').notNullable().references('id').inTable('target').onDelete('CASCADE')
      t.integer('distance').notNullable()
      t.decimal('weight', 3).notNullable().default(1)
      t.decimal('score').notNullable()
      t.string('description')
      t.unique(['targetId', 'exerciseId'])
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('DROP TABLE users CASCADE'),
    knex.raw('DROP TABLE competitor CASCADE'),
    knex.raw('DROP TABLE tournament CASCADE'),
    knex.raw('DROP TABLE matches CASCADE'),
    knex.raw('DROP TABLE match_competitor CASCADE'),
    knex.raw('DROP TABLE exercise CASCADE'),
    knex.raw('DROP TABLE match_exercise CASCADE'),
    knex.raw('DROP TABLE target CASCADE'),
    knex.raw('DROP TABLE target_zone CASCADE'),
    knex.raw('DROP TABLE exercise_target CASCADE')
  ])
};
