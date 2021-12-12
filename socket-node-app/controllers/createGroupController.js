const { Sequelize } = require("sequelize");
const group=require("../models/group");
const message=require("../models/message");
const participant=require("../models/participant");

participant.model.hasMany(group.model, {foreignKey: 'gc_id',sourceKey:'gc_id', as: 'ParticipantGroupChat'});
message.model.hasMany(group.model, {foreignKey: 'gc_id',sourceKey:'gc_id', as:'MessageGroupChat'});
message.model.hasMany(participant.model, {foreignKey: 'participant_id',sourceKey:'participant_id', as:'MessageParticipant'});

exports.create=async (req,res)=>{
    let gc=await group.model.findOne({ where: { gc_name: req.body.group } });
    if(gc===null){
        let g= await group.model.create({gc_name:req.body.group});
        let p = await participant.model.create({gc_id:g.gc_id,participant_username:req.body.user,is_creator:true});
        res.send({success:true,data:p});
    }else{
        res.send({success:false,data:null});
    }
}
// exports.viewMovieDetails=async (req,res)=>{
//     let movies=await movie.model.findOne({
//         where:{
//             movie_id:req.params.id
//         },
//         include: [{
//             model: img.model, as: "movieID"
//         },{
//             model: sched.model, as: "schedMovieID",
//             include: [{
//                 model: cine.model, as: "cinemaSchedID"
//             }]
//         },{model: viewer_rating.model, as: "viewerRatingMovieID"}]
//     });
//     if(req.cookies.uuid!=undefined){
//         jwt.verify(req.cookies.uuid,process.env.SECRET_KEY,async(err,decoded)=>{
//             let user=await account.model.findOne({
//                 where:{
//                     uuid:decoded.uuid
//                 }
//             })
//             let rating=await viewer_rating.model.findOne({
//                 where:{
//                     uuid:decoded.uuid,
//                     movie_id:req.params.id
//                 }
//             })
//             let watchlist = await watch.model.findOne({
//                 where:{
//                     uuid:decoded.uuid,
//                     movie_id:req.params.id
//                 }
//             })
//             res.render("movie_details",{data:user,page_name:'movies',movie:movies,rating:rating,watchlist:watchlist});
//         })
//     }else{
//         res.render("movie_details",{page_name:'movies',movie:movies});
//     }
    
// }
// exports.likeMovie= async (req,res)=>{
//     if(req.cookies.uuid!=undefined){
//         jwt.verify(req.cookies.uuid,process.env.SECRET_KEY,async(err,decoded)=>{
//             let vr=await viewer_rating.model.findOne({
//                 where:{
//                     uuid:decoded.uuid,
//                     movie_id:req.params.id
//                 }
//             })
//             req.body.movie_id=req.params.id;
//             req.body.uuid=decoded.uuid;
//             if(vr==null){
//                 req.body.status=1;
//                 viewer_rating.model.create(req.body);
//                 res.redirect("/movies/details/"+req.params.id);
//             }else{
//                 status=(vr.status==1)?0:1;
//                 viewer_rating.model.update({status: status},{
//                     where:{
//                         uuid:decoded.uuid,
//                         movie_id:req.params.id
//                     }
//                 });
//                 res.redirect("/movies/details/"+req.params.id);
//             }
            
//         })
//     }else{
//         res.redirect("/movies/details/"+req.params.id);
//     }
// }

