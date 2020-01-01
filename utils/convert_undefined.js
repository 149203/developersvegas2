// converts undefined values to an empty string, and returns all other values
module.exports = convert_undefined = value => {
   if (typeof value !== 'undefined') return value
   else return ''
}
