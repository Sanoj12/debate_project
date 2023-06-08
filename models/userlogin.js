const mongoose=require('mongoose');



const Schema = mongoose.Schema;

const userSchema =new  Schema({
    email:{
        type:String,
        required:[true,"please enter your email"]
    },
    password:{
        type:String,
        required:[true,"please enter your password"]
    }
})

module.exports=mongoose.model('Users',userSchema);




