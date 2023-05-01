const mongoose= require('mongoose');

const Schema=mongoose.Schema;

const commentSchema = new Schema({

     user:{
        type:Object,
       
        required:true,
    },
    
    text:{
        type:String,
        required:true,
    },
  

    
    date:{
        type:Date,
        default:Date.now
    }

}) ;

Debate=mongoose.model('Comments',commentSchema);
module.exports=Debate;