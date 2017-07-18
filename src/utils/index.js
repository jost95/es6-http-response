/**
 * Converts a string of words to a JavaScript identifier.
 * @private
 */
const toIdentifier = string =>
  string.split(' ')
    .map(word =>
      word.toUpperCase()[0] + word.slice(1)
    )
    .join('')
    .replace(/[^ _0-9a-z]/gi, '')

module.exports = { toIdentifier }
