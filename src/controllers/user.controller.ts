import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        res.status(400).json({message: 'All fields are required'});
        return;
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "User already exists" });
      return; 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword
    })
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" , newUser});
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
       res.status(400).json({message: 'Email and password are required'});
       return
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(400).json({ message: "Invalid email or password" });
      return; 
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return; 
    }

    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET || 'JWT_SECRET', { expiresIn: '1h' });
    res.status(200).json({message: 'User login successfully', token});
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const getAllUsers= async(req: Request, res: Response): Promise<void> =>{
  try {
    const users= await User.find({}, '-password');

    if(users.length == 0){
      res.status(404).json({message: 'Users not found'});
      return;
    }

    res.status(200).json({message: 'Users fetched succesfully', users:users});
    
  } catch (error) {
    res.status(500).json({message: 'Internal server error'});
  }
};


export const deleteUser= async(req: Request, res: Response): Promise<void> =>{
  try {
    const {id}= req.params;

    const user= await User.findByIdAndDelete(id);
    if(!user){
      res.status(404).json({message: 'User not found'});
      return;
    }

    res.status(200).json({message: 'User deleted successfully'});
    
  } catch (error) {
    res.status(500).json({message: 'Internal server error'});
  }
};