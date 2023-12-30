const express = require('express')
const router=express.Router();
const {createUser,getUser,forgotPassword,passwordReset}=require('../Controllers/userControllers');
const authenticateUser = require('../middleWare/authenticateToken');

router.post('/createUser',createUser)
router.post('/getUser',getUser)
router.get("/validateToken", authenticateUser, (req, res) => {
    res.status(200).send(req.user);
  }).post('/forgot_password',forgotPassword).post('/password_reset',passwordReset)

module.exports = router