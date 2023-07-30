import mongoose from "mongoose";

export interface userAttributes {
  name: string;
  email: string;
  password: string;
  _id: string;
}

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
      },
    },
    timestamps: true,
  }
);

const User = mongoose.model<userAttributes>("User", UserSchema);

export default User;
