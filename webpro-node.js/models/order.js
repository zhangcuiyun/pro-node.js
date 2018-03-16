const mongoose=require('mongoose');
const schema=new mongoose.Schema({
   size:String,
    style:String,
    count:Number,
    goods:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'goods'
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'seller'
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'buyer'
    }
});
module.exports=mongoose.model('order',schema);