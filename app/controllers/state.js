// import validator from 'email-validator'
import jwt from 'jsonwebtoken'
import { TableFilterQuery } from 'sz-node-utils'
import State from '../models/state';
import _ from 'lodash';


import { secret, errorObj, successObj } from '../../config/settings'

const exp = {
    add: async (data) => {
        try {
            let stateObj = new State(data);
            let doc = await stateObj.save();
            return { ...successObj, message: 'State added successfully', data: doc }
        } catch (err) {
            return { err, ...errorObj, message: 'Error Saving State' }
        }
    },
    getAll: async (filters) => {
        try {
            let populateArr = [
                { path: 'country', select: 'countryName' },
            ];
            let data = await TableFilterQuery(State, { ...filters, populateArr });
            return { ...successObj, data: data }
        } catch (err) {
            return { ...errorObj, message: 'Error getting countries' }
        }
    },
    getStateById: async (_id) => {
        try {
            let state = await State.findOne({ _id }).populate({
                path: 'country',
                select: 'countryName'
            });
            return { ...successObj, data: state, message: 'State Details' }
        } catch (err) {
            return { ...errorObj, message: 'Error getting State' }
        }
    },
    update: async (data) => {
        try {
            let stateObj = await State.findByIdAndUpdate(data._id, data);
            if(!stateObj) return { ...errorObj, message: 'State not found' }
            return { ...successObj, message: 'State updated successfully', data: stateObj }
        } catch (err) {
            console.error(err);
            return { ...errorObj, message: 'Error Updating State' }
        }
    },
    delete: async (_id) => {
        try {
            let state = await State.remove({ _id: _id });
            return { ...successObj, message: 'Deleted successfully' }
        } catch (err) {
            return { ...errorObj, message: 'Error in deleting' }
        }
    }

}

export default exp
