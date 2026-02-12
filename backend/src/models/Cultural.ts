import mongoose, { Schema, Document } from "mongoose";

interface ICultural extends Document {
  eventName: string;
  name: string;
  email: string;
  registrationNo: string;
  phoneNo: string;
  section: string;
  year: string;
  registeredAt: Date;
}

const CulturalSchema = new Schema<ICultural>({
  eventName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  registrationNo: { type: String, required: true },
  phoneNo: { type: String, required: true },
  section: { type: String, required: true },
  year: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICultural>("Cultural", CulturalSchema);
