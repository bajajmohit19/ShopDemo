import validator from 'email-validator'
import jwt from 'jsonwebtoken'
import { TableFilterQuery } from 'sz-node-utils'
import Product from '../models/Product'
import _ from 'lodash'
import { secret, errorObj, successObj } from '../../config/settings'

const ProductCtrl = {
    add: (data) => {
        console.log(data)
        return new Promise((resolve) => {

            const newProduct = new Product()
            console.log("qwq",newProduct)
            _.each(data, (val, key) => {
                newProduct[key] = val
            })
            console.log(newProduct)
            newProduct.save((err, doc) => {
                if (err) {
                    console.error(err)
                    return resolve({ ...errorObj, message: 'Error Saving Product Details' })
                }
                resolve({ ...successObj, message: 'Product added successfully', data: doc })
            })

        })
    },
    update: (data) => {
        console.log(data)
        return new Promise((resolve) => {
            Product.findOne({ _id: data._id }, (err, doc) => {
                if (err) {
                    return resolve({ ...errorObj, message: 'error during updation', err })
                }
                else {
                    if (!doc) {
                        return resolve({ ...errorObj, message: 'Product not found' })
                    }
                    _.each(data, (val, key) => {
                        doc[key] = val
                    })
                    doc.save((err, data) => {
                        if (err) {
                            console.log(err)
                            return resolve({ ...errorObj, message: 'unable to update Product', err })
                        }
                        console
                            .log(data)
                        return resolve({ ...successObj, message: 'Product details updated successfully' })
                    })
                }
            })
        })
    },
    getById: (_id) => {
        return new Promise((resolve) => {
            Product.findOne({ _id })
                .exec((err, data) => {
                    console.log(data)
                    if (!data) {
                        return resolve({ ...errorObj, message: 'Product not found', err })
                    }
                    return resolve({ ...successObj, message: 'Product Found', data })

                })
        })
    },
    all: (filters) => {
        return new Promise(async (resolve) => {
            let data = await TableFilterQuery(Product, { ...filters })


            if (!data) {
                return resolve({ ...errorObj, message: "error listing", err });
            }
            return resolve({ ...successObj, message: "Products listed", data });

        });
    },
    delete: (_id) => {
        return new Promise((resolve) => {
            Product.remove({ _id })
                .exec((err, doc) => {
                    if (err || !doc) return resolve({ ...errorObj, err })
                    resolve({ ...successObj, message: 'Products deleted successfully' })
                })
        })
    },



}

export default ProductCtrl
