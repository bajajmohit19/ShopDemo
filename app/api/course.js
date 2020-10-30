import JWT from 'express-jwt'
import express from 'express'
import CourseController from '../controllers/course'
import { secret } from '../../config/settings'

export default (app, passport) => {
    app.route('/course')
        .post(JWT({ secret }), async (req, res) => {
            const { body } = req
            let response = await CourseController.add(body)
            res.json({ ...response })
        })
        .get(JWT({ secret }), async (req, res) => {
            let response = await CourseController.all(req.query)
            res.json({ ...response })
        })
        

    app.route('/course/:_id')
        .get(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await CourseController.getById(_id)
            res.json({ response })
        })
        .put(JWT({ secret }), async (req, res) => {
            const { params: { _id }, body } = req
            body._id = _id
            let response = await CourseController.update(body)
            res.json({ ...response })
        })
        .delete(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await CourseController.delete(_id)
            res.json({ ...response })
        })

}


