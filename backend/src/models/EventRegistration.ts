import mongoose, { Schema, Document } from "mongoose";


interface IParticipant {
    name: string;
    email: string;
    registrationNo: string;
    phoneNo: string;
    section: string;
    year: number;
}

interface IEventRegistration extends Document {
    eventName: string;
    participants: IParticipant[];
    contactEmail: string;
    registeredAt: Date;
}


const EventRegistrationSchema = new Schema<IEventRegistration>({
    eventName: { type: String, required: true },
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


const EventRegistration = mongoose.model<IEventRegistration>(
    "EventRegistration",
    EventRegistrationSchema
);

export default EventRegistration;
