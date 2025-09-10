import dotenv from 'dotenv';
import cors from 'cors'
import bcrypt from "bcrypt";
import express, { json } from 'express';
import { connectDb } from './database/index.js';
import { Signup } from './models/userSignup.models.js';
dotenv.config({
    Path: './.env'
});
const app = express();
app.use(cors())
app.use(json({
    limit : "20kb"
}))
const port = process.env.PORT || 4000;
app.get('/',(req,res)=>{
     res.send("hello backend is running")
});



//    loginform post 
app.post('/login', async (req,res)=>{
    const {email,password} = req.body;
   try {
      const checkEmail = await Signup.findOne({email});
      if(!checkEmail){
        res.status(400).send("email was not correct");
   } 
      const checkPassword = await Signup.findOne({password});

      if(!checkPassword){
        res.status(400).send("password  was not correct");
   } 
   res.status(200).send("login sucessfully") ;

}
   catch (error) {
      console.log(' data was not correctly chexcked',error);
      
   }
    
});


//    signup form  post 
app.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // 1. check duplicate email
    const duplicateEmail = await Signup.findOne({ email });
    if (duplicateEmail) {
      return res.status(200).send("This email already exists");
    }

    // 2. create user
    const log = new Signup({ name, email, password });
    const saveSignup = await log.save();

    console.log("User saved:", saveSignup);
    res.status(201).send("Signup successful");
  } catch (error) {
    console.log("Signup error:", error);
    res.status(500).send("Signup failed");
  }
});



// connect the data base 
connectDb().then(()=>{
app.listen(port,()=>{
    console.log(`my app is running on this ${port}`);
    
})
}).catch((error)=>{
     console.log("failed to start the app",error);
     
});



