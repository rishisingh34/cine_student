import StudentModel from "../models/student.model";
import { Request, Response } from 'express';
import axios from "axios";
import {RECAPTCHA_SECRET_KEY} from '../config/env.config';
import Activity from "../models/activity.model";
// import Token from '../middleware/token.middleware';

const authController={
    login: async(req:Request,res:Response):Promise<Response>=>{
        try{
            const {studentNumber,password,token}=req.body;
            // const {data} = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`);
            // if(!data.success || data.score < 0.5){
            //     return res.status(400).json({error:"Invalid Captcha"});
            // }
            const student=await StudentModel.findOne({studentNumber,password});
            if(!student)
            {
                return res.status(400).json({message:"Invalid credentials"});
            }
            await Activity.findOneAndUpdate({userId:student.id},{lastLogin:Date.now()});
            // const accessToken=await Token.signAccessToken(student.id);
            // res.cookie("accessToken", accessToken, {
            //     httpOnly: true,
            //     secure: true,
            //     sameSite: "none",
            // });
            return res.status(200).json({message:"Login successful", userId : student.id  });
        }
        catch(error)
        {
            return res.status(500).json({message:"Internal server error"});
        }
    }
}

export default authController;