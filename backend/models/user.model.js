import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true,
        minlength:6
    },
    Gender:{
        type:String,
        required:true,
        enum:["nam","nu"]
    }, 
    picturePro:{
        type:String,
        default:"",
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;