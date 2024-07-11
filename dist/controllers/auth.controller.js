"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_model_1 = __importDefault(require("../models/student.model"));
const activity_model_1 = __importDefault(require("../models/activity.model"));
// import Token from '../middleware/token.middleware';
const authController = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { studentNumber, password, token } = req.body;
            // const {data} = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`);
            // if(!data.success || data.score < 0.5){
            //     return res.status(400).json({error:"Invalid Captcha"});
            // }
            const student = yield student_model_1.default.findOne({ studentNumber, password });
            if (!student) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            yield activity_model_1.default.findOneAndUpdate({ userId: student.id }, { lastActivity: Date.now() });
            // const accessToken=await Token.signAccessToken(student.id);
            // res.cookie("accessToken", accessToken, {
            //     httpOnly: true,
            //     secure: true,
            //     sameSite: "none",
            // });
            return res.status(200).json({ message: "Login successful", userId: student.id });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    })
};
exports.default = authController;
