"use strict"
import express from 'express'
export default function configureAuthRouter(passport) {
  var router = express.Router()
  router.post('/login', passport.authenticate('local'), function(req, res) {
    res.send({message: 'You have successfully logged in', user: req.user})
  })
  router.post('/logout', function(req, res) {
    req.logout()
    res.send({message: 'You have successfully logged out'})
  })
  return router
}