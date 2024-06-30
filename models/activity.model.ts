import { Schema, model, Document, Types } from "mongoose";

interface IActivity extends Document {
    userId: Types.ObjectId;
    preference: number;
    firstLogin: Date;
    quesArray : Number[]
}

const activitySchema: Schema<IActivity> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    preference: { type: Number},
    firstLogin: { type: Date},
    quesArray : [{type : Number }] 
});

const Activity = model<IActivity>('Activity', activitySchema);

export default Activity;