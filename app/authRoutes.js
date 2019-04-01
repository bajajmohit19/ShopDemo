import UserController from './controllers/user'
import JWT from "express-jwt";
import {secret} from '../config/settings'

export default (app, passport) => {

    app.route('/login')
        .get((req, res) => {

        })
        .post(async (req, res) => {
            let {body} = req;
            let response = await UserController.login(body);
            res.json(response)

        });


    app.route('/user')
        .get(JWT({secret}), async (req, res) => {

            let {user: {_id}} = req;
            let response = await UserController.profile(_id);
            res.json(response)

        })
        .post(async (req, res) => {
            let {body} = req;
            let response = await UserController.add(body);
            res.json(response)

        })
        .delete((req, res) => {


        })


    app.route('/user/:id')
        .get(async (req, res) => {
            let {params: {id}} = req;
            let response = await UserController.profile(id);
            res.json(response)
        })
        .delete((req, res) => {


        })

    // app.use('/secure', JWT({secret}));


};

