import mongoose, { Schema, Document } from "mongoose";

interface IParticipant {
    name: string;
    email: string;
    registrationNo: string;
    phoneNo: string;
    section: string;
    year: number;
}

interface IPosterPresentation extends Document {
    eventName: string;
    participants: IParticipant[];
    topic: string;
    registeredAt: Date;
}

const PosterPresentationSchema = new Schema<IPosterPresentation>({
    eventName: { type: String, required: true, default: "Poster Presentation" },
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
    topic: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now },
});

// Composite index to prevent duplicate registrations for the same event
PosterPresentationSchema.index({ "participants.registrationNo": 1, eventName: 1 }, { sparse: true });

const PosterPresentation = mongoose.model<IPosterPresentation>("PosterPresentation", PosterPresentationSchema);

export default PosterPresentation;
