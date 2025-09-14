import dotenv from 'dotenv';
import cors from 'cors'
import bcrypt from "bcrypt";
import express, { json } from 'express';
import { connectDb } from './database/index.js';
import { Signup } from './models/userSignup.models.js';
import { Notes } from './models/userNotes.models.js';
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
  
      res.status(200).send({
        message: "login successfully",
        user: {
          id: checkEmail._id,
          username: checkEmail.username,
          email: checkEmail.email
        }
      });

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


// notes data 
app.post('/notes', async(req,res)=>{
  const mynotesData = req.body;
try {
 
  
  
    const myNotes = new Notes(mynotesData);
    const saveNotes = await myNotes.save();
    console.log("notes data was sucessfully saved in database ",saveNotes);
    
  res.status(200).send("the notes  data was sent sucessfully")
} catch (error) {
  console.log("there is an error to get the noteess data",error);
  
}
  
  
})

// GET NOTES DATA 

app.get('/notes/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const getNotes = await Notes.find({ userId }); 
    res.json(getNotes);
  } catch (error) {
    console.log('failed to get notes ', error);
    res.status(500).send("Server error while fetching notes");
  }
});


app.put('/notes/:id' ,  async (req,res)=>{
  try {
         const {id} = req.params;
        const updatedData = req.body;
        const updatedNotes = await Notes.findByIdAndUpdate(
          id,
          updatedData,
          {name:true}
        );
        res.status(200).send("data is updated sucessfully ")
         
  } catch (error) {
    console.log("failed to update the data  ",error);
    
  }
})

// delte notes 

app.delete('/notes/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const dalteNotes = await Notes.findByIdAndDelete(id);
    res.status(200).send("note was deleted sucessfully");
  } catch (error) {
    console.log("failed to delete the notes",error);
    
  }
})




// connect the data base 
connectDb().then(()=>{
app.listen(port,()=>{
    console.log(`my app is running on this ${port}`);
    
})
}).catch((error)=>{
     console.log("failed to start the app",error);
     
});



