"use strict"
import express from 'express'
import {ValidationError} from 'objection'
import {renderValidationErrors} from '../utils/utils'

/**
 *
 * @param {express.res} res
 * @param {function} callback
   */
export async function tryCatchWrapper(res, callback) {
  try {
    const json = await callback();
    res.json(json);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(422).json({
        globalError: 'Invalid data',
        fieldErrors: err.data
      })
    } else {
      console.log(err)
      res.status(500).json(err.message)
    }
  }
}

/**
 * @param {CRUDService} service
 * @returns {*}
 */
export function configureCRUDRouter(service) {
  var router = express.Router()

  router.get('/', async function (req, res) {
    tryCatchWrapper(res, async function() { return await service.list(req)})
  })

  router.get('/:id', async function (req, res) {
    req.checkParams('id').isInt()
    if (renderValidationErrors(req.validationErrors(), res)) return

    tryCatchWrapper(res, async function() { return await service.read(req.params.id)})
  })

  router.put('/', async function (req, res) {
    tryCatchWrapper(res, async function() { return await service.create(req.body)})
  })

  router.post('/:id', async function (req, res) {
    req.checkParams('id').isInt()
    if (renderValidationErrors(req.validationErrors(), res)) return

    tryCatchWrapper(res, async function() { return await service.update(req.params.id, req.body) })
  })

  router.delete('/:id', async function (req, res) {
    req.checkParams('id').isInt()
    if (renderValidationErrors(req.validationErrors(), res)) return

    tryCatchWrapper(res, async function() { return await service.delete(req.params.id)})
  })

  return router
}
export default configureCRUDRouter