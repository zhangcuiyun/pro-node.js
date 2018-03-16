const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    username:String,
    password:String,
    logo:String,
    banner:String
});
module.exports=mongoose.model('seller',schema);