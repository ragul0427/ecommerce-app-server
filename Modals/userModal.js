const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    password:{
        type:String
    },
    confirmPassword:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model("user",userSchema)