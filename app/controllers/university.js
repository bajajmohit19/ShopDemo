// import validator from 'email-validator'
import jwt from 'jsonwebtoken'
import { TableFilterQuery } from 'sz-node-utils'
import University from '../models/university';
import _ from 'lodash';
import { secret, errorObj, successObj } from '../../config/settings';


const exp = {
    add: async (data) => {
        try {
            let universityObj = new University(data);
            let doc = await universityObj.save();
            return { ...successObj, message: 'University added successfully', data: doc }
        } catch (err) {
            return { err, ...errorObj, message: 'Error Saving University' }
        }
    },
    getAll: async (filters) => {
        try {
            let populateArr = [
                { path: 'country', select: 'countryName' },
                { path: 'state', select: 'stateName' },
                { path: 'city', select: 'cityName' },
            ];
            let data = await TableFilterQuery(University, { ...filters, populateArr });
            return { ...successObj, data: data }
        } catch (err) {
            return { ...errorObj, message: 'Error getting countries' }
        }
    },
    getUniversityById: async (_id) => {
        try {
            let university = await University.findOne({ _id }).populate('universityCountry universityState universityCity');
            return { ...successObj, data: university, message: 'University Details' }
        } catch (err) {
            return { ...errorObj, message: 'Error getting University' }
        }
    },
    update: async (data) => {
        try {
            let university = await University.findByIdAndUpdate(data._id, data)
            return { ...successObj, message: 'University updated successfully', data: university }
        } catch (err) {
            return { ...errorObj, message: 'Error Updating University' }
        }
    },
    delete: async (_id) => {
        try {
            let University = await University.remove({ _id: _id });
            return { ...successObj, message: 'Deleted successfully' }
        } catch (err) {
            return { ...errorObj, message: 'Error in deleting' }
        }
    }

}

export default exp