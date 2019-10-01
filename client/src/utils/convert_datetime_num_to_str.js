export default num => {
   // converts number to a string readable by formatting library (date-fns, moment)
   // e.g. 201908101200 becomes "2019-08-10T12:00"
   const str = String(num)
   const year = str.slice(0, 4)
   const month = str.slice(4, 6)
   const day = str.slice(6, 8)
   const hour = str.slice(8, 10)
   const minute = str.slice(10, 13)
   const full_str = `${year}-${month}-${day}T${hour}:${minute}`
   if (minute) return full_str
   if (hour) return full_str.slice(0, 13)
   if (day) return full_str.slice(0, 10)
   if (month) return full_str.slice(0, 7)
   return `${year}-01` // returns something readable by formatting library if only the year is supplied
}
