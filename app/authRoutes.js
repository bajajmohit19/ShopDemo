import JWT from 'express-jwt';

import UserController from './controllers/user'
import {secret} from '../config/settings'

export default (app) => {

    app.route('/login')
        .get((req, res) => {

        })
        .post(async (req, res) => {
            const {body} = req;
            const response = await UserController.login(body);
            res.json(response)

        });


    app.route('/user')
        .get(JWT({secret}), async (req, res) => {

            const {user: {_id}} = req;
            const response = await UserController.profile(_id);
            res.json(response)

        })
        .post(async (req, res) => {
            const {body} = req;
            const response = await UserController.add(body);
            res.json(response)

        })
        .delete((req, res) => {


        })


    app.route('/user/:id')
        .get(async (req, res) => {
            const {params: {id}} = req;
            const response = await UserController.profile(id);
            res.json(response)
        })
        .delete((req, res) => {


        })

    // app.use('/secure', JWT({secret}));


};

