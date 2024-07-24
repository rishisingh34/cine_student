import { Schema, model, Document, Types } from "mongoose";

interface IOption {
    desc: string;
    id: number;
}
  
interface IQuestion extends Document {
    _id: Types.ObjectId;
    subject: string;
    question: string;
    options: IOption[];
}

interface IActivity extends Document {
    userId: Types.ObjectId;
    preference: number;
    lastActivity: number;
    timeSpent: number;
    questions: {[subject: string ] : IQuestion[]};
}

const activitySchema: Schema<IActivity> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    preference: { type: Number},
    lastActivity: { type: Number},
    timeSpent: { type: Number},
    questions: { type: Object, default: {}}
}, { versionKey: false });

const Activity = model<IActivity>('Activity', activitySchema);

export default Activity;