const { Sequelize } = require("sequelize");
const group=require("../models/group");
const message=require("../models/message");
const participant=require("../models/participant");

// participant.model.hasMany(group.model, {foreignKey: 'gc_id',sourceKey:'gc_id', as: 'ParticipantGroupChat'});
// message.model.hasMany(group.model, {foreignKey: 'gc_id',sourceKey:'gc_id', as:'MessageGroupChat'});
// message.model.hasOne(participant.model, {foreignKey: 'participant_id',sourceKey:'participant_id', as:'MessageParticipant'});


exports.insert=async (req,res)=>{
    let m=await message.model.create({gc_id:req.body.group,participant_id:req.body.user,message_content:req.body.content});
    if(m){
        res.send({success:true,data:m});
    }else{
        res.send({success:false,data:null});
    }
}