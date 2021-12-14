require('dotenv').config("./.env");
const { Sequelize } = require("sequelize");
const group=require("../models/group");
const participant=require("../models/participant");
const message=require("../models/message");

group.model.hasMany(participant.model, {foreignKey: 'gc_id',sourceKey:'gc_id', as:'GroupParticipants'});
group.model.hasMany(message.model, {foreignKey: 'gc_id',sourceKey:'gc_id', as:'GroupMessages'});
participant.model.hasMany(message.model, {foreignKey: 'gc_id',sourceKey:'gc_id', as:'ParticipantMessages'})

exports.join = async (req, res) => {
    // console.log(req.params.group);
    let gc=await group.model.findOne({ 
        where: { gc_name: req.params.group },
        include: [{
            model: participant.model, as: "GroupParticipants"
        },{
            model: message.model, as: "GroupMessages"
        }] 
    });
    // console.log(gc);
    if(gc!==null){
        let user=await participant.model.findOne({ 
            where: { participant_username: req.params.user,gc_id: gc.gc_id},
            include: [{
                model: message.model, as: "ParticipantMessages"
            }] 
        });
        if(user){
            res.send({success:true,data:{group:gc, user:user}});
        }else{
            let p = await participant.model.create({gc_id:gc.gc_id,participant_username:req.params.user,is_creator:false});
            res.send({success:true,data:{group:gc, user:p}});
        }
    }else{
        res.send({success:false,data:null});
    }
}

exports.getGroupChatHistory = async (req, res) =>{
    let gc=await group.model.findOne({ 
        where: { gc_name: req.body.group },
        include: [{
            model: participant.model, as: "GroupParticipants",
            
        },{
            model: message.model, as: "GroupMessages",
            include: [{
                model: participant.model, as: "MessageParticipant"
            }]
        }] 
    });
    // console.log(gc);
    if(gc!==null){
        res.send({success:true,data:gc});
    }else{
        res.send({success:false,data:null});
    }
}