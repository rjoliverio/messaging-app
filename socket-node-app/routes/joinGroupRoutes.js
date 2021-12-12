const express=require('express');
const router=express.Router();
const joinGroupController = require('../controllers/joinGroupController');

router.get("/:group/:user", joinGroupController.join);
module.exports = router;