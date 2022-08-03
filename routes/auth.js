const express = require('express')
const router = express.Router()
const UserService = require('./services/authService')
const jwt = require('jsonwebtoken')

router.route('/register').post(async (req, res) => {
  try {
    const { username, password, userType } = req.body
    if (userType !== 'seller' && userType !== 'buyer') {
      throw new Error('userType can only be buyer or seller.')
    }
    if (!password || !username) {
      throw new Error('username and password cannot be empty')
    }
    const user = await UserService.saveUser({
      username,
      password,
      userType
    })
    if (!user) {
      throw new Error('Something went wrong!')
    }
    return res.json({
      message: 'Account successfully created!'
    })
  } catch (err) {
    return res.status(err.status || 500).json({
      message: err.message
    })
  }
})

router.route('/login').post(async (req, res) => {
  try {
    const { username, password } = req.body
    if (!password || !username) {
      throw new Error('username and password cannot be empty')
    }
    const user = await UserService.getUser({
      username, password
    })
    return res.json({
      token: jwt.sign({
        id: user._id,
        username: user.username,
        userType: user.userType
      }, process.env.JWT_SECRET)
    })
  } catch (err) {
    return res.status(err.status || 500).json({
      message: err.message
    })
  }
})

module.exports = router