import convert_datetime_num_to_str from './convert_datetime_num_to_str'
import { format as format_date } from 'date-fns'

export default date_num => {
   if (date_num) {
      const date_str = convert_datetime_num_to_str(date_num)
      return format_date(new Date(date_str), 'dddd, MMM. do, YYYY')
   }
}
