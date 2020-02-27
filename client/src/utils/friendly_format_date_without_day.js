import convert_datetime_num_to_date from './convert_datetime_num_to_date'
import { format as format_date } from 'date-fns'

export default date_num => {
   if (date_num) {
      return format_date(convert_datetime_num_to_date(date_num), 'MMMM d, yyyy')
   }
}
