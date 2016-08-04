import {toArray, toJSON, isObject} from '../utils/utils'

export default class QueryFilter {

  /**
   *
   * @param {QueryBuilder} qb
   * @param {object|string} input
   * rules
   * filterName: {
   *   innerJoin: ...
   *   leftJoin: ....
   *   where: ....
   *
   *   input: {
   *     field: {
   *        operator: '=',
   *        value: 123
   *     }
   *   }
   * @param {object} rules
   */
  static filter(qb, input, rules) {
    if(!input) return qb
    rules = rules || {}
    input = toJSON(input)

    for(let key in input) {
      if(!input.hasOwnProperty(key)) continue
      const i = QueryFilter.formatInput(input[key])

      if(rules.hasOwnProperty(key)) {
        qb = QueryFilter.applyRule(qb, rules[key], i)
      } else {
        qb = qb.andWhere(key, i.operator, i.value)
      }
    }
    return qb
  }

  static DEFAULT_OPERATOR = '='

  /**
   *
   * @param input
   * @returns {*}
   */
  static formatInput(input) {
    if(!isObject(input)) {
      return {
        operator: QueryFilter.DEFAULT_OPERATOR,
        value: input
      }
    } else { //isObject
      return input
    }
  }

  /**
   *
   * @param {object} qb
   * @param {object} rule
   * @param {array} rule.leftJoin
   * @param {array} rule.innerJoin
   * @param {array} rule.where
   * @param {function} rule.fn
   * @param {object} input
   * @param {object} input.params
   * @param {string} input.operator
   * @param {string} input.value
   */
  static applyRule(qb, rule, input) {
    if(typeof rule === 'function') {
      return rule(qb, input)
    } else {
      throw new Error("bad filter rule")
    }
  }

}