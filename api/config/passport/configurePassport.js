import localStrategy from './localStrategy'
export default function configurePassport(passport) {

  passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user))
  })

  passport.deserializeUser(function(user, done) {
    done(null, JSON.parse(user))
  })

  passport.use(localStrategy)

  return passport
}
