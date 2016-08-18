import express from 'express'

function respond(req, res, next) {
  res.status(200).json({
    user: req.user,
    token: req.token
  })
  next()
}

export default function configureAuthRouter(passport, generateToken) {
  const router = express.Router() // eslint-disable-line

  router.post('/login',
    passport.authenticate('local', {session: false}),
    generateToken,
    respond
  )

  router.post('/logout', function (req, res) {
    req.logout()
    res.send({message: 'You have successfully logged out'})
  })
  return router
}
