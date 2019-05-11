const _random = require('lodash/random')

const mask_email = email => {
   let email_masked = ''
   if (email) {
      const local_part = email.slice(0, email.lastIndexOf('@') + 1)
      const domain = email.slice(email.lastIndexOf('@'))
      email_masked = local_part.slice(0, -_random(3, 6)) + '*****' + domain
   }
   return email_masked
}

module.exports = mask_email
