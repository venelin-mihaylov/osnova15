import util from 'util';

// Note: babel cannot inherit from built-in types like Error.
// that's why we use ES5 inheritance here.

/**
 * @param {Object} errors
 */
export default function NotFoundException(tableName, id) {
  Error.call(this);
  Error.captureStackTrace(this, NotFoundException);

  /**
   * @type {Object}
   */
  this.id = id;
  this.tableName = tableName

  /**
   * @type {number}
   */
  this.statusCode = 404;

  /**
   * @type {string}
   */
  this.message = `Object with ID: ${this.id} does not exist `
}

util.inherits(NotFoundException, Error);


