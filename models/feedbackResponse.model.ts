import { Schema, Document, model, Types } from 'mongoose';
interface Response {
    question :string ; 
    ans: string;
}
interface IFeedbackResponse extends Document {
    student: Types.ObjectId; 
    response : Response[];
}

const FeedbackResponseSchema = new Schema<IFeedbackResponse>({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    response : [{
        _id : false , 
        question: { type: String, required: true },
        ans: { type: String, required: true }
    }]
}, {versionKey: false});

const FeedbackResponseModel = model<IFeedbackResponse>('FeedbackResponse', FeedbackResponseSchema);

export default FeedbackResponseModel;
