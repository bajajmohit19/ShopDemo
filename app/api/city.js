import JWT from 'express-jwt'
import express from 'express'
import CityController from '../controllers/city'
import { secret } from '../../config/settings'

export default (app, passport) => {
    app.route('/city')
        .post(JWT({ secret }), async (req, res) => {
            const { body } = req
            let response = await CityController.add(body)
            res.json({ ...response })
        })
        .get(JWT({ secret }), async (req, res) => {
            let response = await CityController.getAll(req.query)
            res.json({ ...response })
        })
        

    app.route('/city/:_id')
        .get(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await CityController.getCityById(_id)
            res.json({ ...response })
        })
        .put(JWT({ secret }), async (req, res) => {
            const { params: { _id }, body } = req
            body._id = _id
            let response = await CityController.update(body)
            res.json({ ...response })
        })
        .delete(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await CityController.delete(_id)
            res.json({ ...response })
        })

}


