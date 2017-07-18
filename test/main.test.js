/* eslint-env mocha */

const chai = require('chai')
const HttpResponse = require('../src/')
const expect = chai.expect

describe('Http responses', () => {
  const customMessage = 'Custom Message'

  it('should create an HTTP error', () => {
    const error = HttpResponse.InternalServerError()

    expect(error).to.be.an.instanceOf(HttpResponse.HttpError)
    expect(error).to.be.an.instanceOf(Error)
    expect(error).to.have.property('http_status', 500)
    expect(error).to.have.property('message', 'Internal Server Error')
  })

  it('should create an HTTP error with custom message', () => {
    const error = HttpResponse.InternalServerError(customMessage)

    expect(error).to.have.property('message', customMessage)
  })

  it('should create a regular HTTP response', () => {
    const result = HttpResponse.OK()

    expect(result).to.be.an.instanceOf(HttpResponse.HttpStatus)
    expect(result).to.have.property('http_status', 200)
    expect(result).to.have.property('message', 'OK')
  })

  it('should create a regular HTTP response with custom message', () => {
    const result = HttpResponse.OK(customMessage)

    expect(result).to.have.property('message', customMessage)
  })

  it('should not be singletons', () => {
    const error1 = HttpResponse.InternalServerError(customMessage)
    const error2 = HttpResponse.InternalServerError()

    expect(error1).to.not.eq(error2)
    expect(error2).to.have.property('message', 'Internal Server Error')
  })

  it('should not be possible to alter reference objects', () => {
    const referenceError = HttpResponse.HttpError
    const referenceStatus = HttpResponse.HttpStatus

    try {
      referenceError.custom = 'This is not possible'
    } catch (error) {
      expect(error).to.be.an.instanceOf(TypeError)
    }

    try {
      referenceStatus.custom = 'This is not possible'
    } catch (error) {
      expect(error).to.be.an.instanceOf(TypeError)
    }
  })
})
