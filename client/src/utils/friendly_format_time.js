export default time => {
   // given a 4-digit time as a string: 0000, 1200, 0345, 2200, 1201, 0001
   // return a friendly time string: midnight, noon, 3:45am, 10pm, 12:01pm, 12:01am
   if (time) {
      if (time.length !== 4) return 'invalid time'
      let hour
      if (time[0] === '0') {
         hour = time[1]
      } else hour = time.slice(0, 2)
      if (hour > 23 || hour < 0) return 'invalid time'
      const minutes = time.slice(-2)
      if (minutes > 59 || minutes < 0) return 'invalid time'
      let friendly_hour = hour
      if (hour === '0') {
         if (minutes === '00') return 'midnight'
         else return '12:' + minutes + 'am'
      }
      if (hour === '12') {
         if (minutes === '00') return 'noon'
         else return friendly_hour + ':' + minutes + 'pm'
      }
      if (hour > 12) {
         friendly_hour = hour - 12
         if (minutes === '00') return friendly_hour + 'pm'
         else return friendly_hour + ':' + minutes + 'pm'
      } else {
         if (minutes === '00') return friendly_hour + 'am'
         else return friendly_hour + ':' + minutes + 'am'
      }
   }
}
