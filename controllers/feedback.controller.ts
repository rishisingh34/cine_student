import { Request,Response } from "express";
import Feedback from "../models/feedback.model";
import FeedbackResponseModel from "../models/feedbackResponse.model";

interface AuthenticatedRequest extends Request {
    userId?: string;
}

const feedbackController={
    feedbackQuestions: async( req:AuthenticatedRequest,res:Response):Promise<Response>=>{
        try{
            const feedbackQuestions=await Feedback.find();
            return res.status(200).json({feedbackQuestions});
        }
        catch(error){
            return res.status(500).json({message:"Internal server error"});
        }
    },
    submitFeedback: async(req:AuthenticatedRequest,res:Response):Promise<Response>=>{
        try{
            const feedbackResponse=new FeedbackResponseModel({
                student:req.userId,
                response:req.body
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