module.exports = convert_undefined = value => {
   if (typeof value !== 'undefined') return value
   else return ''
}
