import { Schema, model, Document, Types } from "mongoose";

interface IActivity extends Document {
    userId: Types.ObjectId;
    preference: number;
    lastActivity: number;
    timeSpent: number
}

const activitySchema: Schema<IActivity> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    preference: { type: Number},
    lastActivity: { type: Number},
    timeSpent: { type: Number}
}, { versionKey: false });

const Activity = model<IActivity>('Activity', activitySchema);

export default Activity;