import {isRowEqual} from './utils'
import {ValidationError} from 'objection'
import {toArray} from '../utils/utils'
import _isString from 'lodash.isstring'
import NotFoundException from '../exception/NotFoundException'

export default class ItoN {

  static _rethrowValidationErrors(err, relName, i) {
    let data = {}
    for(let f in err.data) {
      if(!err.data.hasOwnProperty(f)) continue
      data[`${relName}[${i}].${f}`] = err.data[f]
    }
    throw new ValidationError(data)
  }

  static _handleException(err, relName, i) {
    if(err instanceof ValidationError) {
      console.log('rethrow')
      ItoN._rethrowValidationErrors(err, relName, i)
    } else {
      console.log('no validation, rethrow')
      throw err
    }
  }

  static async findByIdEagerRelation({
    id,
    model,
    relName,
    relSpec,
    eagerParam = {
      orderBy: builder => builder.orderBy('id')
    }
  }) {
    const strEagerParam = Object.keys(eagerParam).join(',')
    let builder = model.query().findById(id)

    const arr = relSpec ? toArray(relSpec).map(s => s.relName) : toArray(relName)
    arr.forEach(rel => builder.eager(`${rel}(${strEagerParam})`, eagerParam))
    return builder
  }

  static _diff({relModel, dbRows, inRows, fk}) {
    // in input, not in db -> insert
    // in input, in db -> update
    // not in input, in db -> delete
    let op = {
      insert: [],
      update: [],
      del: []
    }

    let keep = []
    inRows.forEach(inRow => {
      const dbRow = dbRows.find(dbRow => dbRow.id == inRow.id)
      if (dbRow) {
        // in input, in db -> update
        keep.push(dbRow.id)
        if (!isRowEqual(dbRow.toJSON(), inRow)) {
          op.update.push({relModel, id: dbRow.id, inRow})
        }
      } else {
        // in input, not in db -> create
        op.insert.push({relModel, inRow})
      }
    })
    dbRows.forEach(dbRow => {
      // in db, not in input -> delete
      if (-1 === keep.indexOf(dbRow.id)) op.del.push({relModel, id: dbRow.id})
    })
    return op
  }

  static validateMultiple({model, relSpec, input}) {
    toArray(relSpec).forEach(({relName}) => {
      const relModelClass = model.relationMappings[relName].modelClass
      const relModel = _isString(relModelClass) ? require(relModelClass).default : relModelClass
      const inRows = input[relName]
      ItoN._validate({relModel, relName, inRows})
    })
  }

  /**
   * @param relModel
   * @param relName
   * @param inRows
   * @private
   */
  static _validate({relModel, relName, inRows}) {
    if(!inRows) return
    const o = new relModel()
    inRows.forEach((inRow, i) => {
      try {
        o.$validate(inRow)
      } catch(err) {
        ItoN._handleException(err, relName, i)
      }
    })
  }


  static async updateParentAndRelations({
    id,
    model,
    relSpec,
    input
  }) {
    await this.updateParent({id, model, relSpec, input})
    await this.updateMultiple({id, model, relSpec, input})
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

      const o = {[fk.field]: fk.value};
      const inRows = toArray(input[relName]).map(row => Object.assign({}, row, o))
      ItoN._validate({relModel, relName, inRows})
      const dbRows = await relModel.query().where(fk.field, fk.value)
      const diff = ItoN._diff({relModel, fk, dbRows, inRows})
      await ItoN._persist(diff)
    }
  }

  static async _persist({
    insert,
    update,
    del
  }) {
    let q = []
    del.forEach(({relModel, id}) => q.push(relModel.query().deleteById(id).execute()))
    insert.forEach(({relModel, inRow}) => q.push(relModel.query().insert(inRow)))
    update.forEach(({relModel, id, inRow}) => q.push(relModel.query().update(inRow).where('id', id)))

    // muhahahhaha, await multiple async functions, run in parallel (supposedly)
    await Promise.all(q)
  }

  static _transformRelSpec({id, model, relSpec}) {
    return toArray(relSpec).map(({relName}) => {
      const modelClass = model.relationMappings[relName].modelClass
      const relModel = typeof modelClass == 'string' ?
        require(modelClass).default :
        modelClass
      const fkField = model.relationMappings[relName].join.to.replace(`${relModel.tableName}\.`, '')
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

  static async updateParent({id, model, relSpec, input}) {
    const record = Object.assign({}, input)

    toArray(relSpec).forEach(({relName}) => delete record[relName])

    const r = await model.query().updateAndFetchById(id, record)
    if (!r) {
      throw new NotFoundException(model.tableName, id)
    }
    return r
  }
}