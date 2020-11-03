import validator from 'email-validator'
import jwt from 'jsonwebtoken'
import { TableFilterQuery } from 'sz-node-utils'
import Course from '../models/Course'
import _ from 'lodash'
import { secret, errorObj, successObj } from '../../config/settings'

const courseCtrl = {
    add: (data) => {
        return new Promise((resolve) => {

            const newCourse = new Course()
            _.each(data, (val, key) => {
                newCourse[key] = val
            })
            console.log(newCourse)
            newCourse.save((err, doc) => {
                if (err) {
                    console.error(err)
                    return resolve({ ...errorObj, message: 'Error Saving Course Details' })
                }
                resolve({ ...successObj, message: 'Course added successfully', data: doc })
            })

        })
    },
    update: (data) => {
        console.log(data)
        return new Promise((resolve) => {
            Course.findOne({ _id: data._id }, (err, doc) => {
                if (err) {
                    return resolve({ ...errorObj, message: 'error during updation', err })
                }
                else {
                    if (!doc) {
                        return resolve({ ...errorObj, message: 'course not found' })
                    }
                    _.each(data, (val, key) => {
                        doc[key] = val
                    })
                    doc.save((err) => {
                        if (err) {
                            console.log(err)
                            return resolve({ ...errorObj, message: 'unable to update course', err })
                        }
                        return resolve({ ...successObj, message: 'course details updated successfully' })
                    })
                }
            })
        })
    },
    getById: (_id) => {
        return new Promise((resolve) => {
            Course.findOne({ _id })
                .populate('campusUniversity')
                .populate('campusName')
                .exec((err, data) => {
                    console.log(data)
                    if (!data) {
                        return resolve({ ...errorObj, message: 'Course not found', err })
                    }
                    return resolve({ ...successObj, message: 'Course Found', data })

                })
        })
    },
    all: (filters) => {
        return new Promise(async (resolve) => {
            let populateArr = [{ path: 'courseUniversity', select: 'universityName' }]
            let data = await TableFilterQuery(Course, { ...filters, populateArr })


            if (!data) {
                return resolve({ ...errorObj, message: "error listing", err });
            }
            return resolve({ ...successObj, message: "courses listed", data });

        });
    },
    delete: (_id) => {
        return new Promise((resolve) => {
            Course.remove({ _id })
                .exec((err, doc) => {
                    if (err || !doc) return resolve({ ...errorObj, err })
                    resolve({ ...successObj, message: 'Courses deleted successfully' })
                })
        })
    },



}

export default courseCtrl
