import JWT from 'express-jwt';

import UserController from './controllers/user'
import {secret} from '../config/settings'

export default (app) => {

  app.route('/ping')
    .get((req, res) => {
      res.send('pong')
    })

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
      res.json({data: [], user: req.user})
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

