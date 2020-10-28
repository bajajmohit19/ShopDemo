import validator from 'email-validator'
import jwt from 'jsonwebtoken'
import { TableFilterQuery } from 'sz-node-utils'
import Branch from '../models/Branch'

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
                if (err) {
                    console.error(err)
                    return resolve({ ...errorObj, message: 'Error Saving Branch Details' })
                }
                resolve({ ...successObj, message: 'Branch added successfully', data: doc })
            })

        })
    },
    update: (_id, data) => {
        return new Promise((resolve) => {
            Branch.findOne({ _id }, (err, doc) => {
                if (err) {
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
                        if (err) {
                            return resolve({ ...errorObj, message: 'unable to update branch', err })
                        }
                        return resolve({ ...successObj, message: 'Branch details updated successfully' })
                    })
                }
            })
        })
    },
    all: (data) => {
        return new Promise((resolve) => {
            const branch = Branch.find({ ...data })
                .populate('branchCountry')
                .populate('branchState')
                .populate('branchCity')

            branch.exec((err, data) => {
                if (err || !data) {
                    return resolve({ ...errorObj, message: "error listing", err });
                }
                return resolve({ ...successObj, message: "branches listed", data });

            });
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
