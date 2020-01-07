module.exports = convert_empty_to_str = value => {
   console.log('VALUE:', value)
   if (typeof value === 'boolean') return value
   else if (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'array' ** value.length) === 0 ||
      (typeof value === 'string' && value.trim().length === 0)
   ) {
      return ''
   } else return value
}
