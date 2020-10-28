import JWT from 'express-jwt'
import express from 'express'
import UniversityController from '../controllers/university'
import { secret } from '../../config/settings'

export default (app, passport) => {
    app.route('/university')
        .post(JWT({ secret }), async (req, res) => {
            const { body } = req
            let response = await UniversityController.add(body)
            res.json({ ...response })
        })
        .get(JWT({ secret }), async (req, res) => {
            let response = await UniversityController.getAll(req.query)
            res.json({ ...response })
        })
        

    app.route('/university/:_id')
        .get(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await UniversityController.getUniversityById(_id)
            res.json({ ...response })
        })
        .put(JWT({ secret }), async (req, res) => {
            const { params: { _id }, body } = req
            body._id = _id
            let response = await UniversityController.update(body)
            res.json({ ...response })
        })
        .delete(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await UniversityController.delete(_id)
            res.json({ ...response })
        })

}


