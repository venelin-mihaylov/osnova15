
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(t) {
      t.increments('id').primary()
      t.string('email').notNullable()
      t.string('password').notNullable()
    }),
    knex.schema.createTable('competitor', function(t) {
      t.increments('id').primary()
      t.string('firstName').notNullable()
      t.string('lastName').notNullable()
      t.string('email').notNullable()
    })
  ])
};

exports.down = function(knex, Promise) {
  
};
