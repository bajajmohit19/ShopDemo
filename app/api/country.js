import JWT from 'express-jwt'
import express from 'express'
import CountryController from '../controllers/country'
import { secret } from '../../config/settings'

export default (app, passport) => {
app.route('/country')
  .post(async (req, res) => {
    const {body} = req
    let response = await CountryController.add(body)
    res.json({...response})
  })


}

