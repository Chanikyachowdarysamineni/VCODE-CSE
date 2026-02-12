import mongoose, { Schema, Document } from "mongoose";

interface ISports extends Document {
    eventName: string;
    name: string;
    email: string;
    registrationNo: string;
    gender: string;
    section: string;
    sportName: string;
    year: string;
    department: string;
    teamName: string;
    role: string;
    phoneNo: string;
    registeredAt: Date;
}

const SportsSchema = new Schema<ISports>({
    eventName: { type: String, required: true, default: "Sports" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    registrationNo: { type: String, required: true },
    gender: { type: String },
    section: { type: String, required: true },
    sportName: { type: String, required: true },
    year: { type: String, required: true },
    department: { type: String, required: true },
    teamName: { type: String, required: true },
    role: { type: String, required: true },
    phoneNo: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now },
});

// Composite unique index to prevent duplicate registrations for the same event
SportsSchema.index({ registrationNo: 1, eventName: 1 }, { unique: true });

const Sports = mongoose.model<ISports>("Sports", SportsSchema);

export default Sports;
