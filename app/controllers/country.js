// import validator from 'email-validator'
import jwt from 'jsonwebtoken'
import { TableFilterQuery } from 'sz-node-utils'
import Country from '../models/country'

import { secret, errorObj, successObj } from '../../config/settings'

const exp = {
  add: (data) => {
    return new Promise((resolve) => {
      const {email, password, userType} = data

      if (!email || !password) {
        return resolve(
          {...errorObj, message: 'Please enter email and password'})
      }
      const country = new Country()

      country.save((err, doc) => {
        if (err) {
          console.error(err)
          return resolve({...errorObj, message: 'Error Saving User Details'})
        }
        resolve({...successObj, message: 'user added successfully', data: doc})
      })

    })
  },
 
}

export default exp
