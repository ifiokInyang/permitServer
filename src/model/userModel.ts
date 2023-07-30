import mongoose from "mongoose";

export interface userAttributes {
  fName: string;
  phone: string;
  email: string;
  _id: string;
}

const UserSchema = new mongoose.Schema(
  {
    fName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<userAttributes>("User", UserSchema);

export default User;
