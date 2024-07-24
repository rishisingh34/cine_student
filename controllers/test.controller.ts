import ResponseModel from "../models/response.model";
import StudentModel from "../models/student.model";
import { Request, Response, response } from 'express';
import ActivityModel from "../models/activity.model";
import Question from "../models/question.model";
import NodeCache from "node-cache"; 

const cache = new NodeCache({ stdTTL: 60 * 60 * 3 });

const testController={
    response: async(req:Request,res:Response):Promise<Response>=>{
        try{
            const {userId , quesId,status ,ansId}=req.body;
            const activity=await ActivityModel.findOne({userId});
            if(activity)
            {
                activity.timeSpent=activity.timeSpent+Date.now()-activity.lastActivity;
                activity.lastActivity=Date.now();
                await activity.save();
            }
            const existingResponse=await ResponseModel.findOne({quesId,userId});
            if(existingResponse)
            {
                await ResponseModel.findOneAndUpdate({quesId,userId},{status ,ansId});
                return res.status(200).json({message:"Response updated"});
            }
            const responseReceived=new ResponseModel({quesId,status ,userId,ansId});
            await responseReceived.save();
            return res.status(200).json({message:"Response recorded"});
        }
        catch(error)
        {
            console.log(error);
            
            return res.status(500).json({message:"Internal server error"});
        }
    },
    preferences: async(req:Request,res:Response):Promise<Response>=>{
        try{
            const {userId , preference}=req.body;
            const existingActivity=await ActivityModel.findOne({userId});
            if(existingActivity)
            {
                return res.status(400).json({message:"Preference already set"});
            }
            const activity=new ActivityModel({userId,preference,lastActivity:Date.now(),timeSpent:0});
            await activity.save();
            return res.status(200).json({message:"Preference set"});
        }
        catch(error)
        {
            return res.status(500).json({message:"Internal server error"});
        }
    },
    getQuestions : async(req:Request,res:Response):Promise<Response>=>{
        try{
            const { subject , userId } = req.query;            
            if (!subject) {
                return res.status(400).json({ message: "Subject is required" });
            }
            const cacheKey = `${userId}_${subject}`;
            let questions : any  = cache.get(cacheKey);

            if (!questions) {
                const activity = await ActivityModel.findOne({ userId });
                if(activity?.questions.subject) {
                    return res.status(200).json(activity.questions.subject);
                }
                questions = await Question.find({ subject }).select('-answer').lean();
                questions = questions.sort(() => Math.random() - 0.5);
                cache.set(cacheKey, questions);
                await ActivityModel.findOneAndUpdate({ userId }, { [`questions.${subject}`]: questions });
            }
            return res.status(200).json(questions);
        }
        catch(error) {
            return res.status(500).json({message:"Internal server error"});
        }
    },
    getPreference :  async(req:Request,res:Response):Promise<Response>=>{
        try{

            const userId = req.query.userId as string; 
            const activity = await ActivityModel.findOne({userId}).select({preference:1, _id:0}); 
            switch (activity?.preference) {
                case 3:
                    return res.status(200).json({ language: "C" });
                case 4:
                    return res.status(200).json({ language: "C++" });
                case 5:
                    return res.status(200).json({ language: "Python" });
                case 6:
                    return res.status(200).json({ language: "Java" });
                default:
                    return res.status(400).json({ message: "Invalid preference number" });
            }
        }
        catch(error) {
            return res.status(500).json({message:"Internal server error"});
        }
    },
    getResponses : async(req:Request,res:Response):Promise<Response>=>{
        try{
            const userId = req.query.userId as string;
            const responses = await ResponseModel.find({userId}).select('-_id -_userId -__v');
            return res.status(200).json(responses);
        }
        catch(error) {
            return res.status(500).json({message:"Internal server error"});
        }
    },
    getTime: async(req:Request,res:Response):Promise<Response>=>{
        try{
            const userId = req.query.userId as string;
            const activity = await ActivityModel.findOne({userId});
            const time = 3*60*60*1000;
            if (activity?.timeSpent) {
                return res.status(200).json({ remainingTime: time - activity.timeSpent });
            }
            return res.status(200).json({remainingTime: time});
        }
        catch(error) {
            return res.status(500).json({message:"Internal server error"});
        }
    }
}

export default testController;