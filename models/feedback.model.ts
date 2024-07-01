import { Schema, Document, model } from "mongoose";

interface IFeedback extends Document {
    question: string;
}

const FeedbackSchema = new Schema<IFeedback>({
    question: { type: String, required: true },
}, {versionKey: false});

const Feedback = model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;