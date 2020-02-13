export default num => {
   // converts number to a JavaScript Date object
   const str = String(num)
   const year = Number(str.slice(0, 4))
   const month = Number(str.slice(4, 6)) - 1 // JavaScript months are 0-based
   const day = Number(str.slice(6, 8))
   const hour = Number(str.slice(8, 10))
   const minute = Number(str.slice(10, 13))
   if (minute) return new Date(year, month, day, hour, minute)
   if (hour) return new Date(year, month, day, hour)
   if (day) return new Date(year, month, day)
   if (month) return new Date(year, month)

   return new Date(year)
}
