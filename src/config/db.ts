import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "");
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export default connectDB;




// const connectDB= ()=>{
//       mongoose.connect(process.env.MONGO_URI || "")
//        .then(()=>{
//              console.log('MongoDB connected');
//        })
//        .catch((err)=>{
//             console.log(err);
//        })
// }