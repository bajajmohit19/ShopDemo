import JWT from 'express-jwt'
import express from 'express'
import ProductController from '../controllers/product'
import { secret } from '../../config/settings'
import Product from '../models/Product'
import multer from "multer";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpg")
    }
})
var upload = multer({ storage: storage })

export default (app, passport) => {
    app.route("/upload/file").post(
        upload.single("avatar"),
        async (req , res) => {
            const { file } = req;

            // console.log(storage,"storage????????????????????????????????/");

            console.log(file, "cdervfrrre");
            // const data=await  awsCtrl.set(file)
            // console.log(data,"deceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

            res.json({ file });
        }
    );
    app.route('/product')
        .post(JWT({ secret }), async (req, res) => {
            const { body } = req
            let response = await ProductController.add(body)
            res.json({ ...response })
        })
        .get(JWT({ secret }), async (req, res) => {
            let response = await ProductController.all(req.query)
            res.json({ ...response })
        })


    app.route('/product/:_id')
        .get(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await ProductController.getById(_id)
            res.json({ response })
        })
        .put(JWT({ secret }), async (req, res) => {
            const { params: { _id }, body } = req
            body._id = _id
            let response = await ProductController.update(body)
            res.json({ ...response })
        })
        .delete(JWT({ secret }), async (req, res) => {
            const { params: { _id } } = req
            let response = await ProductController.delete(_id)
            res.json({ ...response })
        })

}


