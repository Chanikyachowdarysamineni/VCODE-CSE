import mongoose, { Schema, Document } from "mongoose";

interface IParticipant {
    name: string;
    email: string;
    registrationNo: string;
    phoneNo: string;
    section: string;
    year: number;
}

interface ICodingChallenge extends Document {
    eventName: string;
    participants: IParticipant[];
    registeredAt: Date;
}

const CodingChallengeSchema = new Schema<ICodingChallenge>({
    eventName: { type: String, required: true, default: "Coding Challenge" },
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
    registeredAt: { type: Date, default: Date.now },
});

// Composite index to prevent duplicate registrations for the same event
CodingChallengeSchema.index({ "participants.registrationNo": 1, eventName: 1 }, { sparse: true });

const CodingChallenge = mongoose.model<ICodingChallenge>("CodingChallenge", CodingChallengeSchema);

export default CodingChallenge;
