import dotenv from 'dotenv';
import cors from 'cors'
import bcrypt from "bcrypt";
import express, { json } from 'express';
import { connectDb } from './database/index.js';
import { Signup } from './models/userSignup.models.js';
dotenv.config({
    path: './.env'
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
        res.status(400).send("email was not found");
   } 
      
    const isMatch = await bcrypt.compare(password, checkEmail.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }
   res.status(200).send("login sucessfully") ;

}
   catch (error) {
      console.log(' data was not correctly chexcked',error);
      
   }
    
});



app.post('/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body;
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
   
    const duplicateEmail = await Signup.findOne({ email });
    if (duplicateEmail) {
      return res.status(400).send("This email already exists");
    }

    
    const log = new Signup({ username, email, password:hashedPassword });
    const saveSignup = await log.save();

    console.log("User saved:", saveSignup);
    res.status(201).send("Signup successful");
  }catch (error) {
  console.error("Signup error:", error.message);
  res.status(500).send("Signup failed: " + error.message);
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



