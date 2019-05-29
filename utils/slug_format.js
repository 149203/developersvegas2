const _to_lower = require('lodash/fp/toLower')
const _trim = require('lodash/fp/trim')
const _deburr = require('lodash/fp/deburr')
const _replace = require('lodash/fp/replace')
const _flow = require('lodash/fp/flow')

const slug_format = str =>
   _flow(
      _to_lower,
      _deburr,
      _replace(/\s/gm, '-'), // replace any spaces with hyphen
      _replace(/[^a-z-]/gm, ''), // remove non a-z and non hyphen chars
      _replace(/[-]{2,}/gm, '-'), // replace any double or multiple hyphens with a single hyphen
      _replace(/^-|-$/gm, ''), // remove any single hyphen at beginning or end
      _trim // last step
   )(str)

// test cases
// Andrea-Yates Johnson
// Andrea-Yates--Johnson
// Andrea -Yates  Johnson
//  Mark-O'Brien
// Jesse-Piño <-space
// --A-shantí- Good-Phillips--

module.exports = slug_format
