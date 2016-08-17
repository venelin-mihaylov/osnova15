import {Strategy, ExtractJwt} from 'passport-jwt'

const params = {
  secretOrKey: 'alabv324234la1',
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
}

const strategy = new Strategy(params, function(payload, done) { // eslint-disable-line
  var user = users[payload.id] || null
  if(user) {
    return done(null, {id: user.id})
  }

})