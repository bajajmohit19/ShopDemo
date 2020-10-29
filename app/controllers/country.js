// import validator from 'email-validator'
import jwt from 'jsonwebtoken'
import { TableFilterQuery } from 'sz-node-utils'
import Country from '../models/country';
import _ from 'lodash';


import { secret, errorObj, successObj } from '../../config/settings'

const exp = {
    add: async (data) => {
        try {
            let countryObj = new Country(data);
            let doc = await countryObj.save();
            return { ...successObj, message: 'Country added successfully', data: doc }
        } catch (err) {
            if (err.code == 11000) {
                return { ...errorObj, message: 'Country name already exists' }
            }
            return { err, ...errorObj, message: 'Error Saving Country' }
        }
    },
    getAll: async (filters) => {
        try {
            let data = await TableFilterQuery(Country, { ...filters });
            return { ...successObj, data: data }
        } catch (err) {
            return { ...errorObj, message: 'Error getting countries' }
        }
    },
    getCountryById: async (_id) => {
        try {
            let country = await Country.findOne({ _id });
            return { ...successObj, data: country, message: 'Country Details' }
        } catch (err) {
            return { ...errorObj, message: 'Error getting country' }
        }
    },
    update: async (data) => {
        try {
            let countryObj = await Country.findByIdAndUpdate(data._id, data);
            if (!countryObj) return { ...errorObj, message: 'Country not found' }
            return { ...successObj, message: 'Country updated successfully', data: countryObj }
        } catch (err) {
            if (err.code == 11000) {
                return { ...errorObj, message: 'Country name already exists' }
            }
            return { ...errorObj, message: 'Error Updating Country' }
        }
    },
    delete: async (_id) => {
        try {
            let country = await Country.remove({ _id: _id });
            return { ...successObj, message: 'Deleted successfully' }
        } catch (err) {
            return { ...errorObj, message: 'Error in deleting' }
        }
    }

}

export default exp
