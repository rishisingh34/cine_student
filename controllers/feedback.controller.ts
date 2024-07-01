import { Request,Response } from "express";
import Feedback from "../models/feedback.model";
import FeedbackResponseModel from "../models/feedbackResponse.model";

interface AuthenticatedRequest extends Request {
    userId?: string;
}

const feedbackController={
    feedbackQuestions: async( req:AuthenticatedRequest,res:Response):Promise<Response>=>{
        try{
            const feedbackQuestions=await Feedback.find().select('question -_id');
            return res.status(200).json({feedbackQuestions});
        }
        catch(error){
            return res.status(500).json({message:"Internal server error"});
        }
    },
    submitFeedback: async(req:AuthenticatedRequest,res:Response):Promise<Response>=>{
        try{
            const {question,ans}=req.body;
            const userId=req.userId;
            const existingFeedback=await FeedbackResponseModel.findOne({student:userId});
            if(existingFeedback)
            {
                return res.status(400).json({message:"Feedback already submitted"});
            }
            const feedbackResponse=new FeedbackResponseModel({
                student:userId,
                response:[{question,ans}]
            });
            await feedbackResponse.save();
            return res.status(200).json({message:"Feedback recorded"});
        }
        catch(error){
            return res.status(500).json({message:"Internal server error"});
        }
    }
}

export default feedbackController;