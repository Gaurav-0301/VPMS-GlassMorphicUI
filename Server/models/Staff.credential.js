const mongoose=require("mongoose")

const StaffSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:email,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:true
    }
})

const StaffCredential=mongoose.model("StaffCredential",StaffSchema)

module.exports=StaffCredential;