const express = require('express')
const { userAuth } = require('../middleware/auth')
const { validateProfileEdit, validatePasswordData } = require('../../utils/validation')

const profileRouter = express.Router()

profileRouter.get('/profile/view', userAuth, async (req, res) => {
  return res.status(200).json({
    message: "View your profile",
    data: req.user
  })
})

profileRouter.patch("/profile/edit", userAuth,async (req, res) => {
  try {
    validateProfileEdit(req);
    const requestBody = req.body;
    const user = req.user;
    Object.entries(requestBody).forEach(entry => {
      const [field, value] = entry;
      user[field] = value
    })
    await user.save();
    res.status(200).send({
      message: 'user.firstName + " your Profile was Updated Successfully"',
      data: user
    });
  }
  catch(err) {
    res.status(400).send(err.message)
  }
})


profileRouter.patch("/profile/forgotPassword", userAuth, async(req, res) => {
  try {
    validatePasswordData(req);
    const loggedInUser = req.user;
    const {password} = req.body;
    await loggedInUser.setPassword(password);
    await loggedInUser.save();
    res.json({
      status: "Success",
      message: "Updated password Succesfully"
    })
  }
  catch(err) {
    res.status(400).json({
      message: err.message,
      success: false
    })
  }
})

module.exports = profileRouter
