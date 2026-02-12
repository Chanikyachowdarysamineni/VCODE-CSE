import mongoose, { Schema, Document } from "mongoose";

interface IParticipant {
    name: string;
    email: string;
    registrationNo: string;
    phoneNo: string;
    section: string;
    year: number;
}

interface ICodeHunt extends Document {
    eventName: string;
    participants: IParticipant[];
    teamName: string;
    registeredAt: Date;
}

const CodeHuntSchema = new Schema<ICodeHunt>({
    eventName: { type: String, required: true, default: "Code Hunt" },
    participants: [
        {
            name: { type: String, required: true },
            email: { type: String, required: true },
            registrationNo: { type: String, required: true },
            phoneNo: { type: String, required: true },
            section: { type: String, required: true },
            year: { type: Number, required: true },
        },
    ],
    teamName: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now },
});

// Composite index to prevent duplicate registrations for the same event
CodeHuntSchema.index({ "participants.registrationNo": 1, eventName: 1 }, { sparse: true });

const CodeHunt = mongoose.model<ICodeHunt>("CodeHunt", CodeHuntSchema);

export default CodeHunt;
