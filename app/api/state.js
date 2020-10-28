import JWT from 'express-jwt'
import express from 'express'
import StateController from '../controllers/state'
import { secret } from '../../config/settings'

export default (app, passport) => {
    app.route('/state')
        .post(JWT({ secret }), async (req, res) => {
            const { body } = req
            let response = await StateController.add(body)
            res.json({ ...response })
        })
        .get(JWT({ secret }), async (req, res) => {
            let response = await StateController.getAll(req.query)
            res.json({ ...response })
        })
        

    app.route('/state/:_id')
        .get(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await StateController.getStateById(_id)
            res.json({ ...response })
        })
        .put(JWT({ secret }), async (req, res) => {
            const { params: { _id }, body } = req
            body._id = _id
            let response = await StateController.update(body)
            res.json({ ...response })
        })
        .delete(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await StateController.delete(_id)
            res.json({ ...response })
        })

}


