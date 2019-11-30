// trims the time (the last 4 digits) from a datetime num

export default datetime_num => {
   if (datetime_num) {
      return String(datetime_num).slice(-4)
   }
}
