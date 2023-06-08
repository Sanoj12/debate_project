const mongoose=require("mongoose");

const dbconnects=async ()=>{
    try{
        const connectdb=await mongoose.connect(process.env.CONNECTION_STRINGS)
        console.log("database " +connectdb.connection.name + " connected");
    }catch(err){
        console.log(err);;
    }
}  
module.exports=dbconnects;