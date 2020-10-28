import JWT from 'express-jwt'
import express from 'express'
import BranchCtrl from '../controllers/branch'
import { secret } from '../../config/settings'

export default (app, passport) => {
    app.route('/branch')
        .post(JWT({ secret }), async (req, res) => {
            const { body } = req
            let response = await BranchCtrl.add(body)
            res.json({ ...response })
        })
        .get(JWT({ secret }), async (req, res) => {
            let response = await BranchCtrl.all(req.query)
            res.json({ ...response })
        })
        

    app.route('/branch/:_id')
        .get(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await BranchCtrl.getById(_id)
            res.json({ ...response })
        })
        .put(JWT({ secret }), async (req, res) => {
            const { params: { _id }, body } = req
            body._id = _id
            let response = await BranchCtrl.update(body)
            res.json({ ...response })
        })
        .delete(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await BranchCtrl.delete(_id)
            res.json({ ...response })
        })

}


