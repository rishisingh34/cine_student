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
const response_model_1 = __importDefault(require("../models/response.model"));
const activity_model_1 = __importDefault(require("../models/activity.model"));
const question_model_1 = __importDefault(require("../models/question.model"));
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 60 * 60 * 3 });
const testController = {
    response: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, quesId, status, ansId } = req.body;
            const activity = yield activity_model_1.default.findOne({ userId });
            if (activity) {
                activity.timeSpent = activity.timeSpent + Date.now() - activity.lastActivity;
                activity.lastActivity = Date.now();
                yield activity.save();
            }
            const existingResponse = yield response_model_1.default.findOne({ quesId, userId });
            if (existingResponse) {
                yield response_model_1.default.findOneAndUpdate({ quesId, userId }, { status, ansId });
                return res.status(200).json({ message: "Response updated" });
            }
            const responseReceived = new response_model_1.default({ quesId, status, userId, ansId });
            yield responseReceived.save();
            return res.status(200).json({ message: "Response recorded" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }),
    preferences: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, preference } = req.body;
            const existingActivity = yield activity_model_1.default.findOne({ userId });
            if (existingActivity) {
                return res.status(400).json({ message: "Preference already set" });
            }
            const activity = new activity_model_1.default({ userId, preference, lastActivity: Date.now(), timeSpent: 0 });
            yield activity.save();
            return res.status(200).json({ message: "Preference set" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }),
    getQuestions: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { subject, userId } = req.query;
            if (!subject) {
                return res.status(400).json({ message: "Subject is required" });
            }
            const cacheKey = `${userId}_${subject}`;
            let questions = cache.get(cacheKey);
            if (!questions) {
                const activity = yield activity_model_1.default.findOne({ userId });
                if (activity === null || activity === void 0 ? void 0 : activity.questions.subject) {
                    return res.status(200).json(activity.questions.subject);
                }
                questions = yield question_model_1.default.find({ subject }).select('-answer').lean();
                questions = questions.sort(() => Math.random() - 0.5);
                cache.set(cacheKey, questions);
                yield activity_model_1.default.findOneAndUpdate({ userId }, { [`questions.${subject}`]: questions });
            }
            return res.status(200).json(questions);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }),
    getPreference: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.query.userId;
            const activity = yield activity_model_1.default.findOne({ userId }).select({ preference: 1, _id: 0 });
            switch (activity === null || activity === void 0 ? void 0 : activity.preference) {
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
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }),
    getResponses: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.query.userId;
            const responses = yield response_model_1.default.find({ userId }).select('-_id -_userId -__v');
            return res.status(200).json(responses);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }),
    getTime: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.query.userId;
            const activity = yield activity_model_1.default.findOne({ userId });
            const time = 3 * 60 * 60 * 1000;
            if (activity === null || activity === void 0 ? void 0 : activity.timeSpent) {
                return res.status(200).json({ remainingTime: time - activity.timeSpent });
            }
            return res.status(200).json({ remainingTime: time });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    })
};
exports.default = testController;
