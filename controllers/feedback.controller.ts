import { Request,Response } from "express";
import Feedback from "../models/feedback.model";
import FeedbackResponseModel from "../models/feedbackResponse.model";

const feedbackController={
    feedbackQuestions: async( req:Request,res:Response):Promise<Response>=>{
        try{
            const feedbackQuestions=await Feedback.find();
            return res.status(200).json({feedbackQuestions});
        }
        catch(error){
            return res.status(500).json({message:"Internal server error"});
        }
    },
    submitFeedback: async(req:Request,res:Response):Promise<Response>=>{
        try{
            const { userId, response  } = req.body;             
            if(!response)
            {
                return res.status(400).json({message:"Response is required"});
            }
            const feedbackResponse=new FeedbackResponseModel({
                student:userId,
                response: response 
            });
            await feedbackResponse.save();
            return res.status(200).json({message:"Feedback recorded"});
        }
        catch(error){
            console.log(error);
            
            return res.status(500).json({message:"Internal server error"});
        }
    }
}

export default feedbackController;