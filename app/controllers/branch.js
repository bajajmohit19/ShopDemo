import validator from 'email-validator'
import jwt from 'jsonwebtoken'
import { TableFilterQuery } from 'sz-node-utils'
import Branch from '../models/Branch'
import _ from 'lodash'
import { getField } from './_utils';

import { secret, errorObj, successObj } from '../../config/settings'

const branchCtrl = {
    add: (data) => {
        return new Promise((resolve) => {

            const newBranch = new Branch()
            _.each(data, (val, key) => {
                newBranch[key] = val
            })
            console.log(newBranch)
            newBranch.save((err, doc) => {
                if (err || !doc) {
                    if(err.code == 11000)
                    {
                        return resolve({...errorObj, message:`Branch with this ${getField(err)} already exists`})
                    }
                    console.error(err)
                    return resolve({ ...errorObj, message: 'Error Saving Branch Details', err})
                }
                resolve({ ...successObj, message: 'Branch added successfully', data: doc })
            })

        })
    },
    update: ( data) => {
        return new Promise((resolve) => {
            Branch.findOne({ _id: data._id }, (err, doc) => {
                if (err) {
                    if(err.code == 11000)
                    {
                        return resolve({...errorObj, message:`Branch with this ${getField(err)} already exists`})
                    }
                    return resolve({ ...errorObj, message: 'error during updation', err })
                }
                else {
                    if (!doc) {
                        return resolve({ ...errorObj, message: 'branch not found' })
                    }
                    _.each(data, (val, key) => {
                        doc[key] = val
                    })
                    doc.save((err) => {
                        console.log(err)
                        if (err) {
                            return resolve({ ...errorObj, message: 'unable to update branch', err })
                        }
                        return resolve({ ...successObj, message: 'Branch details updated successfully' })
                    })
                }
            })
        })
    },
    getById: (_id) => {
        return new Promise((resolve) => {
            Branch.findOne({ _id })
                .populate('branchCountry branchCity branchState')
                .exec((err, data) => {

                    if (!data) {
                        return resolve({ ...errorObj, message: 'Branch not found', err })
                    }
                    return resolve({ ...successObj, message: 'Branch Found',data })

                })
        })
    },
    all: (filters) => {
        return new Promise(async (resolve) => {
            let populateArr = [
                { path: 'branchCountry', select: 'countryName' },
                { path: 'branchState', select: 'stateName' },
                { path: 'branchCity', select: 'cityName' }
            ]
            let data = await TableFilterQuery(Branch, { ...filters, populateArr })


            if (!data) {
                return resolve({ ...errorObj, message: "error listing", err });
            }
            return resolve({ ...successObj, message: "branches listed", data });
        });
    },
    delete: (_id) => {
        return new Promise((resolve) => {
            Branch.remove({ _id })
                .exec((err, doc) => {
                    if (err || !doc) return resolve({ ...errorObj, err })
                    resolve({ ...successObj, message: 'Branch deleted successfully' })
                })
        })
    },



}

export default branchCtrl
