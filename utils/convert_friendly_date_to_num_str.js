module.exports = convert_friendly_date_to_num_str = str => {
   // expects a string in this format:
   // November 9th, 2019
   // returns a string in this format:
   // 20191109
   const month_str = String(str.match(/^\w*/))
   const year = String(str.match(/\d{4}$/))
   let day = String(str.match(/\d+/))
   if (day.length === 1) day = '0' + day // pad single-digit days with a zero
   let month
   switch (month_str) {
      case 'January':
         month = '01'
         break
      case 'February':
         month = '02'
         break
      case 'March':
         month = '03'
         break
      case 'April':
         month = '04'
         break
      case 'May':
         month = '05'
         break
      case 'June':
         month = '06'
         break
      case 'July':
         month = '07'
         break
      case 'August':
         month = '08'
         break
      case 'September':
         month = '09'
         break
      case 'October':
         month = '10'
         break
      case 'November':
         month = '11'
         break
      case 'December':
         month = '12'
         break
   }
   return Number(year + month + day)
}
