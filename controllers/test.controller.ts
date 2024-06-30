import ResponseModel from "../models/response.model";
import StudentModel from "../models/student.model";
import { Request, Response, response } from 'express';
import ActivityModel from "../models/activity.model";
import Question from "../models/question.model";
import NodeCache from "node-cache"; 

const cache = new NodeCache({ stdTTL: 60 * 60 * 3 });
interface AuthenticatedRequest extends Request {
    userId?: string;
}

const testController={
    response: async(req:AuthenticatedRequest,res:Response):Promise<Response>=>{
        try{
            const {quesId,response,ansId}=req.body;
            const userId=req.userId;
            const existingResponse=await ResponseModel.findOne({quesId,userId});
            if(existingResponse)
            {
                await ResponseModel.findOneAndUpdate({quesId,userId},{response,ansId});
                return res.status(200).json({message:"Response updated"});
            }
            const responseReceived=new ResponseModel({quesId,response,userId,ansId});
            await responseReceived.save();
            return res.status(200).json({message:"Response recorded"});
        }
        catch(error)
        {
            return res.status(500).json({message:"Internal server error"});
        }
    },
    preferences: async(req:AuthenticatedRequest,res:Response):Promise<Response>=>{
        try{
            const {preference}=req.body;
            const userId=req.userId;
            const existingActivity=await ActivityModel.findOne({userId});
            if(existingActivity)
            {
                return res.status(400).json({message:"Preference already set"});
            }
            const activity=new ActivityModel({userId,preference,firstLogin:Date.now()});
            await activity.save();
            return res.status(200).json({message:"Preference set"});
        }
        catch(error)
        {
            return res.status(500).json({message:"Internal server error"});
        }
    },
    getQuestions : async(req:AuthenticatedRequest,res:Response):Promise<Response>=>{
        try{
            const userId = req.userId;
            const { subject } = req.query;            
            if (!subject) {
                return res.status(400).json({ message: "Subject is required" });
            }
            const cacheKey = `${userId}_${subject}`;
            let questions : any  = cache.get(cacheKey);

            if (!questions) {
                questions = await Question.find({ subject });
                questions = questions.sort(() => Math.random() - 0.5);
                cache.set(cacheKey, questions);
            }
            return res.status(200).json(questions);
        }
        catch(error) {
            return res.status(500).json({message:"Internal server error"});
        }
    },
}

export default testController;