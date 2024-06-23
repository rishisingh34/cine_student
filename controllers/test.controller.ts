import ResponseModel from "../models/response.model";
import StudentModel from "../models/student.model";
import { Request, Response, response } from 'express';

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
    }
}

export default testController;