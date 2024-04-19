import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Ket noi MongoDB thanh cong");
    } catch (error){
        console.log("Loi ket noi MongoDB", error.massage);
    }
};
export default connectDB;