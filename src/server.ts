import express,{ Request, Response } from "express"; 
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoute from "./routes/user";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.get('/', (req: Request, res: Response)=>{
    res.send('Welcome to the Rest API with TypeScript !');
});

app.use('/api/users', userRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
