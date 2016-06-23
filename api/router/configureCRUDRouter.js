"use strict"
import express from 'express'
import {ValidationError} from 'objection'
import {renderValidationErrors} from '../utils/utils'

/**
 * @param {CRUDService} service
 * @returns {*}
 */
export default function configureCRUDRouter(service) {
  var router = express.Router()
  router.get('/', function(req, res) {
    res.json(service.list(req))
  })
  router.get('/:id', function(req, res) {
    req.checkParams('id').isInt()
    if(renderValidationErrors(req.validationErrors(), res)) return

    res.json(service.read(req.params.id))
  })
  router.put('/', function(req, res) {
    try {
      res.json(service.create(req.body))
    } catch(err) {
      if(err instanceof ValidationError) {
        res.status(422).json({
          globalError: 'Invalid data',
          fieldErrors: err.data
        })
      } else {
        res.status(500).json(err.data)
      }
    }
  })
  router.post('/:id', async function(req, res) {
    req.checkParams('id').isInt()
    if(renderValidationErrors(req.validationErrors(), res)) return

    try {
      res.json(await service.update(req.params.id, req.body))
    } catch(err) {
      if(err instanceof ValidationError) {
        res.status(422).json({
          globalError: 'Invalid data',
          fieldErrors: err.data
        })
      } else {
        res.status(500).json(err.data)
      }
    }
  })
  router.delete('/:id', function(req, res) {
    req.checkParams('id').isInt()
    if(renderValidationErrors(req.validationErrors(), res)) return

    res.json(service.delete(req.params.id))
  })
  return router
}