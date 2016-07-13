import {isRowEqual} from './utils'
import {ValidationError} from 'objection'
import {toArray} from '../utils/utils'

export default class ItoN {

  static rethrowValidationErrors(err, relation, i) {
    let data = {}
    for(let f in err.data) {
      if(!err.data.hasOwnProperty(f)) continue
      data[`${relation}[${i}].${f}`] = err.data[f]
    }
    throw new ValidationError(data)
  }

  static handleException(err, relation, i) {
    if(err instanceof ValidationError) {
      ItoN.rethrowValidationErrors(err, relation, i)
    } else {
      throw err
    }
  }

  static async findByIdEagerRelation({
    id,
    model,
    relation,
    eagerParam = {
      orderBy: builder => builder.orderBy('id')
    }
  }) {
    const arrRelation = toArray(relation)
    const strEagerParam = Object.keys(eagerParam).join(',')
    let builder = model.query().findById(id)
    arrRelation.forEach(rel => builder.eager(`${relation}(${strEagerParam})`, eagerParam))
    return builder
  }

  static validateMultiple({model, relation, input}) {

    const arrRelation = toArray(relation)
    const modelClass = model.relationMappings[relation].modelClass
    const relModel = typeof modelClass == 'string' ?
      require(modelClass).default :
      modelClass

    arrRelation.forEach(relation => ItoN.validate({
      relModel,
      relation,
      inRows: input[relation]
    }))
  }

  static validate({relModel, relation, inRows}) {
    const o = new relModel()
    for(let i = 0; i < inRows.length; i++) {
      const inRow = inRows[i]
      try {
        o.$validate(inRow)
      } catch(err) {
        ItoN.handleException(err, relation, i)
      }
    }
  }

  static async updateMultiple({input, params}) {
    const arrItoN = toArray(params)

    for(let i = 0; i < arrItoN.length; i++) {
      const {
        relModel,
        relation,
        fk
      } = params[i]

      const inRows = input[relation]
      const dbRows = await relModel.query().where(fk.field, fk.value)
      await ItoN.update({
        relModel,
        relation,
        fk,
        dbRows,
        inRows,
      })
    }
  }

  static paramsByModel({model, id, relation}) {
    const arrRelation = toArray(relation)
    return arrRelation.map(relation => {
      const modelClass = model.relationMappings[relation].modelClass
      const relModel = typeof modelClass == 'string' ?
        require(modelClass).default :
        modelClass
      const fkField = model.relationMappings[relation].join.to.replace(`${relModel.className}.`, '')
      return {
        relation,
        fk: {
          field: fkField,
          value: id
        },
        relModel
      }
    })
  }

  static async update({relModel, relation, dbRows, inRows, fk}) {
    ItoN.validate({relModel, relation, inRows})

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

}