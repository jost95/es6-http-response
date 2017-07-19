# es6-http-response
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/es6-http-response)
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)


When you need a consistent way to handle HTTP responses. Uses ES6 `class` and `extends` keywords which also is the suggested way from Node.Js, as per their docs:

> Note: Usage of util.inherits() is discouraged. Please use the ES6 class and extends keywords to get language level inheritance support.

Inspiration from the awesome [http-errors](https://www.npmjs.com/package/http-errors) module. 

## Installation

```javascript
npm install es6-http-response
```

## Usage

```javascript
const HttpResponse = require('es6-http-response')

// Create a new Internal Server Error response
const error = HttpResponse.InteralServerError()

error instanceof HttpResponse.HttpError // true
error instanceof HttpResponse.Error // true

// Create a new Bad Request error with a custom message
const error = HttpResponse.BadRequest('ID must be a string')

// Create new HTTP status response
const status = HttpResponse.OK()

status instanceof HttpResponse.HttpStatus // true
```

## Example with Express

```javascript
const HttpResponse = require('es6-http-response')
const express = require('express')
const app = express()

/* ... business logic ... */

// Catch 404 error
app.use((req, res, next) => {
  next(HttpResponse.NotFound())
})

// Log error
app.use((err, req, res, next) => {
  console.error(err)
  next(err)
})

// If not a HTTP error, create an internal server error
app.use((err, req, res, next) => {
  err instanceof HttpResponse.HttpError ? next(err) : next(HttpResponse.InternalServerError())
})

// Handle error and respond to client
app.use((err, req, res, next) => {
  res.status(err.http_status).send(err.message)
})

/* ... */
```

## Example with a custom setup

```javascript
const HttpResponse = require('es6-http-response')

const errorHandler = error => {
  const checkError = error instanceof HttpResponse.HttpError
  return {
    http_status: checkError ? error.http_status : 500,
    message: checkError ? error.message : 'Internal Server Error',
    data: null
  }
}

const resultHandler = (data, status) => {
  const checkStatus = status instanceof HttpResponse.HttpStatus
  return {
    http_status: checkStatus ? status.http_status : 200,
    message: checkStatus ? status.message : 'OK',
    data
  }
}

/* ... */

return asyncOperation()
  .then(data => resultHandler(data, HttpResponse.Created()))
  .catch(errorHandler)

/* ... */

```

## Methods

All method names are the corresponding HTTP message in PascalCase, e.g. `HttpResponse.NotFound()` results in a status _404_ with message _Not Found_.

See [http-errors](https://www.npmjs.com/package/http-errors) for all method names.

## Test

`npm test`

## License

[MIT](./LICENSE)


