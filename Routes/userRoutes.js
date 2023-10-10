const express = require('express')
const router=express.Router();
const {createUser,getUser}=require('../Controllers/userControllers');
const authenticateUser = require('../middleWare/authenticateToken');

router.post('/createUser',createUser)
router.post('/getUser',getUser)
router.get("/validateToken", authenticateUser, (req, res) => {
    res.status(200).send(req.user);
  });

module.exports = router