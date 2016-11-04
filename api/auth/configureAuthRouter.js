import express from 'express'

function respond(req, res, next) {
  res.status(200).json({
    user: req.user
  })
  next()
}

export default function configureAuthRouter(passport) {
  const router = express.Router() // eslint-disable-line

  router.post('/login',
    passport.authenticate('local'),
    respond
  )

  router.post('/logout', function (req, res) {
    req.logOut()
    res.send({message: 'You have successfully logged out'})
  })
  return router
}
