module.exports = convert_to_str = value => {
   if (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'array' ** value.length) === 0 ||
      (typeof value === 'string' && value.trim().length === 0)
   ) {
      return ''
   } else return String(value)
}
