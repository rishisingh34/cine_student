import { Schema, model, Document, Types } from "mongoose";

interface IActivity extends Document {
    userId: Types.ObjectId;
    preference: number;
    lastLogin: Date;
    timeSpent: number;
    lastResponse: Date
}

const activitySchema: Schema<IActivity> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    preference: { type: Number},
    lastLogin: { type: Date},
    timeSpent: { type: Number},
    lastResponse: { type: Date}
}, { versionKey: false });

const Activity = model<IActivity>('Activity', activitySchema);

export default Activity;