import validator from 'email-validator'
import jwt from 'jsonwebtoken'
import { TableFilterQuery } from 'sz-node-utils'
import Campus from '../models/Campus'

import { secret, errorObj, successObj } from '../../config/settings'

const campusCtrl = {
    add: (data) => {
        return new Promise((resolve) => {

            const newCampus = new Campus()
            _.each(data, (val, key) => {
                newCampus[key] = val
            })
            console.log(newCampus)
            newCampus.save((err, doc) => {
                if (err) {
                    console.error(err)
                    return resolve({ ...errorObj, message: 'Error Saving Campus Details' })
                }
                resolve({ ...successObj, message: 'Campus added successfully', data: doc })
            })

        })
    },
    update: (_id, data) => {
        return new Promise((resolve) => {
            Campus.findOne({ _id }, (err, doc) => {
                if (err) {
                    return resolve({ ...errorObj, message: 'error during updation', err })
                }
                else {
                    if (!doc) {
                        return resolve({ ...errorObj, message: 'campus not found' })
                    }
                    _.each(data, (val, key) => {
                        doc[key] = val
                    })
                    doc.save((err) => {
                        if (err) {
                            return resolve({ ...errorObj, message: 'unable to update campus', err })
                        }
                        return resolve({ ...successObj, message: 'campus details updated successfully' })
                    })
                }
            })
        })
    },
    getById: (_id) => {
        return new Promise((resolve) => {
            EmpSchema.findOne({ _id })
                .populate('branchCountry branchCity branchState campusUniversity')
                .exec((err, data) => {

                    if (!data) {
                        return resolve({ ...errorObj, message: 'Branch not found', err })
                    }
                    return resolve({ ...successObj, message: 'Branch Found',data })

                })
        })
    },
    all: (data) => {
        return new Promise((resolve) => {
            let populateArr = [
                { path: 'country', select: 'countryName' },
                { path: 'state', select: 'stateName' },
                { path: 'city', select: 'cityName' },
                { path: 'university', select: 'universityname' }

            ]
            let campus = await TableFilterQuery(Campus, { ...data, populateArr })


            if (!branches) {
                return resolve({ ...errorObj, message: "error listing", err });
            }
            return resolve({ ...successObj, message: "campuses listed", campus });
        });
    },
    delete: (_id) => {
        return new Promise((resolve) => {
            Campus.remove({ _id })
                .exec((err, doc) => {
                    if (err || !doc) return resolve({ ...errorObj, err })
                    resolve({ ...successObj, message: 'Campus deleted successfully' })
                })
        })
    },



}

export default campusCtrl
