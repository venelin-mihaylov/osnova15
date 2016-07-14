import {isRowEqual} from './utils'
import {ValidationError} from 'objection'
import {toArray} from '../utils/utils'
import _isString from 'lodash.isstring'

export default class ItoN {

  static rethrowValidationErrors(err, relName, i) {
    let data = {}
    for(let f in err.data) {
      if(!err.data.hasOwnProperty(f)) continue
      data[`${relName}[${i}].${f}`] = err.data[f]
    }
    throw new ValidationError(data)
  }

  static handleException(err, relName, i) {
    if(err instanceof ValidationError) {
      ItoN.rethrowValidationErrors(err, relName, i)
    } else {
      throw err
    }
  }

  static async findByIdEagerRelation({
    id,
    model,
    relName,
    eagerParam = {
      orderBy: builder => builder.orderBy('id')
    }
  }) {
    const strEagerParam = Object.keys(eagerParam).join(',')
    let builder = model.query().findById(id)
    toArray(relName).forEach(rel => builder.eager(`${rel}(${strEagerParam})`, eagerParam))
    return builder
  }

  static async _updateSingle({relModel, relName, dbRows, inRows, fk}) {
    ItoN._validateSingle({relModel, relName, inRows})

    // in input, not in db -> insert
    // in input, in db -> update
    // not in input, in db -> delete
    let keep = []
    for (let i = 0; i < inRows.length; i++) {
      let inRow = Object.assign({}, inRows[i])
      inRow[fk.field] = fk.value
      const dbRow = dbRows.find(dbRow => dbRow.id == inRow.id)
      if (dbRow) {
        // in input, in db -> update
        keep.push(dbRow.id)
        if (!isRowEqual(dbRow.toJSON(), inRow)) {
          await relModel.query().update(inRow).where('id', dbRow.id)
        }
      } else {
        // in input, not in db -> create
        await relModel.query().insert(inRow)
      }
    }

    for (let i = 0; i < dbRows.length; i++) {
      const dbRow = dbRows[i]
      if (-1 === keep.indexOf(dbRow.id)) {
        // in db, not in input -> delete
        await relModel.query().deleteById(dbRow.id).execute()
      }
    }
  }

  static validateMultiple({model, relSpec, input}) {
    toArray(relSpec).forEach(({relName}) => {
      const relModelClass = model.relationMappings[relName].modelClass
      const relModel = _isString(relModelClass) ? require(relModelClass).default : relModelClass
      const inRows = input[relName]
      ItoN._validateSingle({relModel, relName, inRows})
    })
  }

  /**
   * @param relModel
   * @param relName
   * @param inRows
   * @private
   */
  static _validateSingle({relModel, relName, inRows}) {
    if(!inRows) return
    const o = new relModel()
    for(let i = 0; i < inRows.length; i++) {
      const inRow = inRows[i]
      try {
        o.$validate(inRow)
      } catch(err) {
        ItoN.handleException(err, relName, i)
      }
    }
  }

  static async updateMultiple({id, model, relSpec, input}) {
    const arrRelSpec = ItoN._transformRelSpec({
      id,
      model,
      relSpec
    })

    for(let i = 0; i < arrRelSpec.length; i++) {
      const {
        relModel,
        relName,
        fk
      } = arrRelSpec[i]

      const inRows = input[relName]
      const dbRows = await relModel.query().where(fk.field, fk.value)
      await ItoN._updateSingle({
        relModel,
        relName: relName,
        fk,
        dbRows,
        inRows,
      })
    }
  }

  static _transformRelSpec({model, id, relSpec}) {
    return toArray(relSpec).map(({relName}) => {
      const modelClass = model.relationMappings[relName].modelClass
      const relModel = typeof modelClass == 'string' ?
        require(modelClass).default :
        modelClass
      const fkField = model.relationMappings[relName].join.to.replace(`${relModel.className}.`, '')
      return {
        relModel,
        relName,
        fk: {
          field: fkField,
          value: id
        }
      }
    })
  }



}