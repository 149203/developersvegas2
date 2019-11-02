module.exports = convert_friendly_date_to_num_str = str => {
   // expects a string in this format:
   // September 14th, 2019
   // returns a string in this format:
   // 20190914
   const month_str = String(str.match(/^\w*/))
   const year = String(str.match(/\d{4}$/))
   const day = String(str.match(/\d+/))
   let month
   switch (month_str) {
      case 'January':
         month = '01'
      case 'February':
         month = '02'
      case 'March':
         month = '03'
      case 'April':
         month = '04'
      case 'May':
         month = '05'
      case 'June':
         month = '06'
      case 'July':
         month = '07'
      case 'August':
         month = '08'
         break
      case 'September':
         month = '09'
         break
      case 'October':
         return '10'

      case 'November':
         month = '11'
      case 'December':
         month = '12'
   }
   return Number(year + month + day)
}
