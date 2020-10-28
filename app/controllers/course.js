import validator from 'email-validator'
import jwt from 'jsonwebtoken'
import { TableFilterQuery } from 'sz-node-utils'
import Course from '../models/Course'

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
    update: (_id, data) => {
        return new Promise((resolve) => {
            Course.findOne({ _id }, (err, doc) => {
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
                            return resolve({ ...errorObj, message: 'unable to update branch', err })
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
                .exec((err, data) => {

                    if (!data) {
                        return resolve({ ...errorObj, message: 'Course not found', err })
                    }
                    return resolve({ ...successObj, message: 'Course Found',data })

                })
        })
    },
    all: (data) => {
        return new Promise(async (resolve) => {
            let populateArr = [{ path: 'unviversity', select: 'universityName' }]
            let courses = await TableFilterQuery(Course, { ...data, populateArr })


            if (!courses) {
                return resolve({ ...errorObj, message: "error listing", err });
            }
            return resolve({ ...successObj, message: "courses listed", courses });

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
