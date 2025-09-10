import mongoose from 'mongoose'; 
const signSchema = new mongoose.Schema({

    username:{
        type:String,
        reqired:true,
        unique:true,
    },
    email:{
        type:String,
        reqired:true,
        unique:true,
    },
    password:{
        type:String,
        reqired:true,
        unique:true,
    },
},{timestamps:true});


export const Signup = mongoose.model("Signup",signSchema)