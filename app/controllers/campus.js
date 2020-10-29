import validator from 'email-validator'
import jwt from 'jsonwebtoken'
import { TableFilterQuery } from 'sz-node-utils'
import Campus from '../models/Campus'
import _ from 'lodash'

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
                    console.log("data isssss", data)
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
            Campus.findOne({ _id })
                .populate('campusCountry campusCity campusState campusUniversity')
                .exec((err, data) => {

                    if (!data) {
                        return resolve({ ...errorObj, message: 'Campus not found', err })
                    }
                    return resolve({ ...successObj, message: 'Campus Found',data })

                })
        })
    },
    all: (data) => {
        return new Promise(async (resolve) => {
            let populateArr = [
                { path: 'campusCountry', select: 'countryName' },
                { path: 'campusState', select: 'stateName' },
                { path: 'campusCity', select: 'cityName' },
                { path: 'campusUniversity', select: 'universityName' }

            ]
            let campus = await TableFilterQuery(Campus, { ...data, populateArr })


            if (!campus) {
                return resolve({ ...errorObj, message: "error listing", err });
            }
            return resolve({ ...successObj, message: "campuses listed", data:campus });
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
