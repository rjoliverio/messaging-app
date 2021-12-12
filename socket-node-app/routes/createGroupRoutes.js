const express=require('express');
const router=express.Router();
const createGroupController=require("../controllers/createGroupController");

router.post("",createGroupController.create);
module.exports=router;