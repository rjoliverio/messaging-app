const express=require('express');
const router=express.Router();
const joinGroupController = require('../controllers/joinGroupController');

router.get("/:group/:user", joinGroupController.join);
router.post("/get-data", joinGroupController.getGroupChatHistory);
module.exports = router;