"use strict";
import express from 'express';
export default function configureAuthRouter(passport) {
  var router = express.Router();
  router.post('/login2', function(req, res) {
    res.send("logged in");
  });
  router.post('/login', passport.authenticate('local'));
  router.post('/logout', passport.authenticate('local'));
  return router;
};