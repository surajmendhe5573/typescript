import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, default: "" },
  email: { type: String, required: true},
  password: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
