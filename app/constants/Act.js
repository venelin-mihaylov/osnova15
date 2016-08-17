export default class Act {

  static ADD_FAVOURITE_EXERCISE_TO_MATCH_REQUESTED = 'ADD_FAVOURITE_EXERCISE_TO_MATCH_REQUESTED'
  static ADD_FAVOURITE_EXERCISE_TO_MATCH_SUCCESS = 'ADD_FAVOURITE_EXERCISE_TO_MATCH_SUCCESS'
  static ADD_FAVOURITE_EXERCISE_TO_MATCH_ERROR = 'ADD_FAVOURITE_EXERCISE_TO_MATCH_ERROR'

  /**
   *
   * @param {string} entity
   * @param {string} action
   * @returns {*}
   */
  static type(entity, action) {
    return `${entity.toUpperCase()}_${action}`
  }

  static act = entity => (actionType, rest = {}) => {
    if (Array.isArray(rest)) {
      return Object.assign({
        type: Act.type(entity, actionType),
        value: rest,
      })
    }
    if (typeof rest === 'object') {
      return Object.assign({
        type: Act.type(entity, actionType),
      }, rest)
    }
    return Object.assign({
      type: Act.type(entity, actionType),
      value: rest,
    })
  }
}
