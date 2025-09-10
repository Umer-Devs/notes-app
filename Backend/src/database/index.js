import dotenv from  'dotenv';
import mongoose  from 'mongoose';
import { dbName } from '../constant.js';
dotenv.config({
    path :'./.env'
});


const connectDb = async  ()=>{
    try {
        await mongoose.connect(`${process.env.DB_URL}/${dbName}`)
        console.log("database connected suceesfully");
        
    } catch (error) {
        console.log('failed to conect the data base error is ',error);
        process.exit(1);
        
    }
};



export {connectDb }