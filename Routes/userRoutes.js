const express = require('express')
const router=express.Router();
const {createUser,getUser}=require('../Controllers/userControllers');
const authenticateUser = require('../middleWare/authenticateToken');

router.post('/createUser',createUser)
router.post('/getUser',getUser)
router.get('/me', authenticateUser, (req, res) => {
    console.log(req.userId)
    res.send(req.userId);
});

module.exports = router