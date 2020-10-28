import JWT from 'express-jwt'
import express from 'express'
import campusCtrl from '../controllers/campus'
import { secret } from '../../config/settings'

export default (app, passport) => {
    app.route('/campus')
        .post(JWT({ secret }), async (req, res) => {
            const { body } = req
            let response = await campusCtrl.add(body)
            res.json({ ...response })
        })
        .get(JWT({ secret }), async (req, res) => {
            let response = await campusCtrl.all(req.query)
            res.json({ ...response })
        })
        

    app.route('/campus/:_id')
        .get(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await campusCtrl.getById(_id)
            res.json({ ...response })
        })
        .put(JWT({ secret }), async (req, res) => {
            const { params: { _id }, body } = req
            body._id = _id
            let response = await campusCtrl.update(body)
            res.json({ ...response })
        })
        .delete(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await campusCtrl.delete(_id)
            res.json({ ...response })
        })

}


