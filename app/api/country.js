import JWT from 'express-jwt'
import express from 'express'
import CountryController from '../controllers/country'
import { secret } from '../../config/settings'

export default (app, passport) => {
    app.route('/country')
        .post(async (req, res) => {
            const { body } = req
            let response = await CountryController.add(body)
            res.json({ ...response })
        })
        .get(async (req, res) => {
            let response = await CountryController.getAll(req.query)
            res.json({ ...response })
        })
        

    app.route('/country/:_id')
        .get(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await CountryController.getCountryById(_id)
            res.json({ ...response })
        })
        .put(JWT({ secret }), async (req, res) => {
            const { params: { _id }, body } = req
            body._id = _id
            let response = await CountryController.update(body)
            res.json({ ...response })
        })
        .delete(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await CountryController.delete(_id)
            res.json({ ...response })
        })

}


