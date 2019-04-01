import validator from "email-validator";
import jwt from 'jsonwebtoken';
import User from '../models/user';
import {secret} from '../../config/settings'

const user = {
    add: (data) => {
        return new Promise((resolve) => {

            let {email, password, userType} = data;

            if (!email || !password) {
                return resolve({...errorObj, message: 'Please enter email and password'})
            }
            if (!validator.validate(email)) {
                return resolve({...errorObj, message: 'Invalid Email Address'})
            }

            let user = new User();
            user.email = email;
            user.password = user.generateHash(password);
            if (userType) {
                user.userType = userType;
            }

            user.save((err, doc) => {
                if (err) {
                    console.log(err);
                    return resolve({...errorObj, message: 'Error Saving User Details'})
                }
                resolve({...successObj, message: 'user added successfully'})
            })


        })
    },
    profile: (_id) => {
        return new Promise((resolve) => {
            User.findOne({_id}).exec((err, data) => {

                if (err) {
                    console.log(err);
                    return resolve({...errorObj, message: 'User not found'})
                }

                resolve({...successObj, data})
            })
        })
    },
    login: (data) => (new Promise((resolve) => {
        let {email, password} = data;

        let error = 'wrong email or password'

        User.findOne({'email': email})
            .exec(function (err, user) {

                if (!user) return resolve({...errorObj, message: error});
                if (!user.validPassword(password)) return resolve({...errorObj, message: error});

                const JWTToken = jwt.sign({
                        _id: user._id,
                        email: user.email,
                        userType: user.userType
                    },
                    secret,
                    {
                        expiresIn: '24h'
                    });

                return resolve({
                    ...successObj,
                    token: JWTToken,
                    user: {
                        _id: user._id,
                        email: user.email,
                        userType: user.userType
                    }
                });

            })

    }))
}


export default user;
