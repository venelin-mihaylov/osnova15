"use strict";
import UserModel from '../../../universal/model/UserModel';
var LocalStrategy = require('passport-local').Strategy;

const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, function (req, email, password, done) {

  UserModel.query()
    .where('email', '=', email)
    .then(function (users) {

      if (!users.length || users.length > 1) return done(err, false, {error: "Wrong username or password"});
      if(password == users[0].password) {
        return done(null, users[0]);
      } else {
        return done(null, false, {error: "Wrong username or password2"});
      }
    }).catch(err => {
      return done(err, false, {error: "Server error occurred"});
    });
});

export default localStrategy;