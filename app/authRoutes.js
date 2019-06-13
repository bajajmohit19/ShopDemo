import JWT from 'express-jwt';
import UserController from './controllers/user'
import {secret, errorObj, successObj} from '../config/settings'

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
    .get( async (req, res) => {
      let response = await UserController.usersList()
      res.json(response)

    })
    .post(async (req, res) => {
      const {body} = req;
      const response = await UserController.add(body);
      res.json(response)

    })

  app.route('/user/:_id')
    .get(async (req, res) => {
      const {params: {_id}} = req;
      const response = await UserController.profile(_id);
      return res.json({...response})
    })
    .put(JWT({secret}), async (req, res) => {
      const {params: {_id}, body, user} = req
      if (user) {
        body._id = _id
        const response = await UserController.update(body);
        return res.json({...response})
      }
      res.json({...errorObj, message: 'Invalid token'})
    })
    .delete(JWT({secret}), async (req, res) => {
      let {params: {_id}, user} = req

      if (user) {
        let data = await UserController.delete(_id)
        return res.json({...data})
      }
      res.json({...errorObj, message: 'Invalid token'})

    })

  // app.use('/secure', JWT({secret}));


};

