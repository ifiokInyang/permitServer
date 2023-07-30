import mongoose from "mongoose";

export interface userLoadAttributes {
  title: string;
  permitNumber: string;
  lastRenewalDate: string;
  nextRenewalDate: string;
  company: string;
  description: string;
  _id: string;
}

const UserLoadSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    bulb: { type: Number, default: 0 },
    fan: { type: Number, default: 0 },
    tv: { type: Number, default: 0 },
    computer: { type: Number, default: 0 },
    refrigerator: { type: Number, default: 0 },
    freezer: { type: Number, default: 0 },
    ac: { type: Number, default: 0 },
    otherLoads: { type: String, default: "Nil" },
  },
  {
    timestamps: true,
  }
);

const UserLoad = mongoose.model<userLoadAttributes>("UserLoad", UserLoadSchema);

export default UserLoad;
