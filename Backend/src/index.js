import dotenv from 'dotenv';
import express from 'express';
dotenv.config({
    Path: './.env'
});
const app = express();
const port = process.env.PORT || 4000;
app.get('/',(req,res)=>{
     res.send("hello backend is running")
});

app.listen(port,()=>{
    console.log(`my app is running on this ${port}`);
    
})