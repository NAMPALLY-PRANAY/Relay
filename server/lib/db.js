import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        mongoose.connection.on('conncted', ()=>console.log('Database Connected'));
        await mongoose.connect(`${process.env.MONGODB_URL}/chat-app`)
    } catch(error)
    {
        console.log(error);
    }
}