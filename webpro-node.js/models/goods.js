const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    title:String,
    description:String,
    smallImage:String,
    bigImages:Array,
    price:Number,
    style:Array,
    size:Array,
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'seller'
    }
});
module.exports=mongoose.model('goods',schema);