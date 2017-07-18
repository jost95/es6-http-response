'use strict'

const statuses = require('http').STATUS_CODES
const { toIdentifier } = require('./utils')

// For HTTP responses which are not errors
class HttpStatus {
  constructor (status, message) {
    this.http_status = status
    this.message = message
  }
}

// For HTTP errors
class HttpError extends Error {
  constructor (status, message) {
    super(message)
    this.http_status = status
  }
}

// Freze the reference objects
Object.freeze(HttpStatus)
Object.freeze(HttpError)

/**
 * Initializes all the response functions
 */
const init = () => {
  Object.keys(statuses).forEach(status => {
    let code = parseInt(status)
    let standardMessage = statuses[status]

    /**
     * Exports HTTP responses as camelcase functions with an optional custom message
     *
     * @param {string} customMessage Custom HTTP message
     * @return {Object} HTTP response
     */
    module.exports[toIdentifier(standardMessage)] = customMessage =>
      createResponse(code, (typeof customMessage === 'undefined' ? standardMessage : customMessage))
  })
}

/**
 * Returns an HTTP response object
 *
 * @param {int} status HTTP status
 * @param {string} message HTTP message
 * @return {Object}
 * @private
 */
const createResponse = (status, message) =>
  (status >= 400 && status < 600)
  ? new HttpError(status, message)
  : new HttpStatus(status, message)

// Initialize responses
init()

// Export the HTTP error and regular status object for reference
module.exports.HttpError = HttpError
module.exports.HttpStatus = HttpStatus
