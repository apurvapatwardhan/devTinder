const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const {
  validateSignupData,
  validateLoginData,
} = require('../../utils/validation')
const { userAuth } = require('../middleware/auth')
const authRouter = express.Router()

authRouter.post('/signup', async (req, res) => {
  //validate req body
  try {
    validateSignupData(req)
    const userData = req.body
    const hashedPassword = await bcrypt.hash(userData.password, 12)
    const user = new User({ ...userData, password: hashedPassword })
    await user.save()
    res.send('Data added')
  } catch (err) {
    res.status(500).send(err.message)
  }
})

authRouter.post('/login', async (req, res) => {
  try {
    validateLoginData(req, ['email', 'password'])

    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('User doesnt exist')
    }

    const isPasswordCorrect = await user.isCorrectPassword(password)
    if (!isPasswordCorrect) {
      throw new Error('Not valid credentials')
    }

    //create a jwt token
    const token = await user.getJwt()
    res.cookie('jwt', token, { httpOnly: true, expiresIn: '1d' })

    return res.status(200).send('User logged in')
  } catch (error) {
    res.status(400).send(error.message)
  }
})

authRouter.post('/logout', userAuth, (req, res) => {
  res.cookie('jwt', null, {
    expires: new Date(Date.now()),
  })
  res.status(200).send('Logged out')
})

module.exports = authRouter
