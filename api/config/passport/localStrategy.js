import UserModel from '../../../universal/model/UserModel'
const LocalStrategy = require('passport-local').Strategy

const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true,
}, (req, email, password, done) => {
  UserModel.query()
    .where('email', '=', email)
    .then(users => {
      if (!users.length || users.length > 1) {
        return done(null, false, {error: 'Wrong username or password'})
      }
      if (password === users[0].password) {
        return done(null, {
          email: users[0].email,
        })
      }
      return done(null, false, {error: 'Wrong username or password2'})
    })
    .catch(err => done(err, false, {error: 'Server error occurred'}))
})
export default localStrategy
