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
                newBranch[key] = val
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
    all: (data) => {
        return new Promise((resolve) => {
            const course = Course.find({ ...data })
                .populate('courseUniversity')

            course.exec((err, data) => {
                if (err || !data) {
                    return resolve({ ...errorObj, message: "error listing", err });
                }
                return resolve({ ...successObj, message: "courses listed", data });

            });
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

export default branchCtrl
