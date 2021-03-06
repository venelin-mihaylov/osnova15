import User from '../../../universal/model/User'
const LocalStrategy = require('passport-local').Strategy

const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true,
}, (req, email, password, done) => {
  User.query()
    .where('email', '=', email)
    .then(users => {
      if (!users.length || users.length > 1) {
        return done(null, false, {error: 'Wrong username or password'})
      }
      if (password === users[0].password) {
        return done(null, {
          id: users[0].id,
          email: users[0].email,
        })
      }
      return done(null, false, {error: 'Wrong username or password2'})
    })
    .catch(err => done(err, false, {error: 'Server error occurred'}))
})
export default localStrategy
