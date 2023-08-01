import mongoose from "mongoose";

export interface permitAttributes {
  title: string;
  permitNumber: string;
  lastRenewalDate: string;
  nextRenewalDate: string;
  company: string;
  description: string;
  userId: string;
  _id: string;
}

const PermitSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    permitNumber: { type: String, required: true },
    lastRenewalDate: { type: String, required: true },
    nextRenewalDate: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Permit = mongoose.model<permitAttributes>("Permit", PermitSchema);

export default Permit;
