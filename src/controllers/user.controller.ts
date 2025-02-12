// import { Request, Response } from "express";
// import User, { IUser } from "../models/user.model";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv"
// dotenv.config();

// export const register = async (req: Request, res: Response): Promise<void> => {
//   const { name, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//        res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user: IUser = new User({ name, email, password: hashedPassword });
//     await user.save();

//     res.status(201).json({ message: "User registered successfully"});
//   } catch (error) {
//     res.status(500).json({ message: "Error registering user", error });
//   }
// };

  

// export const login = async (req: Request, res: Response): Promise<void> => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//        res.status(400).json({ message: "Invalid email or password" });
//        return;
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//        res.status(400).json({ message: "Invalid email or password" });
//        return;
//     }

//     const token = jwt.sign({id: user._id}, process.env.JWT_SECRET || 'JWT_SECRET', {expiresIn: '1h'});
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error });
//   }
// };
 

import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return; // Add return to stop further execution
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" , user});
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return; // Add return to stop further execution
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return; // Add return to stop further execution
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'JWT_SECRET', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};