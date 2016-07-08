import {toArray, toJSON} from '../utils/utils'

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

      if(rules.hasOwnProperty(key)) {
        qb = QueryFilter.applyRule(qb, rules[key], input[key])
      } else {
        qb.andWhere(key, input[key].operator, input[key].value)
      }
    }
    return qb
  }

  /**
   *
   * @param {object} qb
   * @param {object} rule
   * @param {array} rule.leftJoin
   * @param {array} rule.innerJoin
   * @param {array} rule.where
   * @param {object} input
   * @param {string} input.operator
   * @param {string} input.value
   */
  static applyRule(qb, rule, input) {
    if(rule.leftJoin) {
      const leftJoin = toArray(rule.leftJoin)
      leftJoin.forEach(j => qb.leftJoin(j[0], j[1], j[2]))
    }
    if(rule.innerJoin) {
      const innerJoin = toArray(rule.innerJoin)
      innerJoin.forEach(j => qb.innerJoin(j[0], j[1], j[2]))
    }
    if(rule.where) {
      const where = toArray(rule.where)
      where.forEach(j => qb.andWhere(j[0], input.operator, input.value))
    }

    return qb
  }

}