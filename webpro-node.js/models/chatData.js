const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    sendname:String,
    receivename:String,
    chatInfo:String
});
module.exports=mongoose.model('chat',schema);