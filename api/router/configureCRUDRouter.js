"use strict";
import express from 'express';
export default function configureCRUDRouter(service) {
  var router = express.Router();
  router.get('/', function(req, res) {
    res.json(service.list(req));
  });
  router.get('/:id', function(req, res) {
    res.json(service.read(req.params.id));
  });
  router.put('/', function(req, res) {
    res.json(service.create(req.body));
  });
  router.post('/:id', function(req, res) {
    res.json(service.update(req.params.id, data));
  });
  router.delete('/:id', function(req, res) {
    res.json(service.delete(req.params.id));
  });
  return router;
}