// import validator from 'email-validator'
import jwt from 'jsonwebtoken'
import { TableFilterQuery } from 'sz-node-utils'
import City from '../models/city';
import _ from 'lodash';


import { secret, errorObj, successObj } from '../../config/settings'

const exp = {
    add: async (data) => {
        try {
            let cityObj = new City(data);
            let doc = await cityObj.save();
            return { ...successObj, message: 'City added successfully', data: doc }
        } catch (err) {
            return { err, ...errorObj, message: 'Error Saving City' }
        }
    },
    getAll: async (filters) => {
        try {
            let populateArr = [
                { path: 'country', select: 'countryName' },
                { path: 'state', select: 'stateName' },
            ];
            let data = await TableFilterQuery(City, { ...filters, populateArr });
            return { ...successObj, data: data }
        } catch (err) {
            return { ...errorObj, message: 'Error getting countries' }
        }
    },
    getCityById: async (_id) => {
        try {
            let city = await City.findOne({ _id }).populate('country state');
            return { ...successObj, data: city, message: 'City Details' }
        } catch (err) {
            return { ...errorObj, message: 'Error getting City' }
        }
    },
    update: async (data) => {
        try {
            let city = await City.findByIdAndUpdate(data._id, data)
            if(!city) return { ...errorObj, message: 'City not found' }
            return { ...successObj, message: 'City updated successfully', data: city }
        } catch (err) {
            return { ...errorObj, message: 'Error Updating City' }
        }
    },
    delete: async (_id) => {
        try {
            let city = await City.remove({ _id: _id });
            return { ...successObj, message: 'Deleted successfully' }
        } catch (err) {
            return { ...errorObj, message: 'Error in deleting' }
        }
    }

}

export default exp
