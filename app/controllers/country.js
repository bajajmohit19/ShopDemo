// import validator from 'email-validator'
import jwt from 'jsonwebtoken'
import { TableFilterQuery } from 'sz-node-utils'
import Country from '../models/country';
import _ from 'lodash';


import { secret, errorObj, successObj } from '../../config/settings'

const exp = {
    add: (data) => {
        return new Promise((resolve) => {
            let countryObj = new Country();
            _.each(data, (val, key) => {
                countryObj[key] = val
            });
            countryObj.save((err, doc) => {
                if (err) {
                    console.error(err)
                    return resolve({ ...errorObj, message: 'Error Saving Country' })
                }
                resolve({ ...successObj, message: 'Country added successfully', data: doc })
            })

        })
    },

}

export default exp
