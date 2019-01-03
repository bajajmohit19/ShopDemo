import UserController from './controllers/user'

export default (app, passport) => {

    app.route('/login')
        .get((req, res) => {

        })
        .post(async (req, res) => {
            let {body} = req;
            let data = await UserController.login(body);
            console.log(data)
            res.json(data)
        })


    app.route('/user')
        .get((req, res) => {

        })
        .post(async (req, res) => {
            let {body} = req;
            let data = await UserController.add(body);
            res.json(data)

        })
        .delete((req, res) => {


        })

};

