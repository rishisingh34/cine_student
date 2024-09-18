const Response = require('../models/response.model');
const Student = require('../models/student.model');
const Activity = require('../models/activity.model');
const Question = require('../models/question.model');
const NodeCache = require('node-cache');
const getLanguage = require('../utils/getLanguage');

const cache = new NodeCache({ stdTTL : 60 * 60 * 1 });

const testController = {
    response : async (req, res) => {
        try {
            const { userId , quesId , status , ansId} = req.body; 
            const activity = await Activity.findOne({userId}) ; 
            if(activity) {
                activity.timeSpent = activity.timeSpent+ Date.now()-activity.lastActivity; 
                activity.lastActivity = Date.now();
                await activity.save();
            }
            const existingResponse = await Response.findOne({userId, quesId});
            if(status == -1 ) {
                await Response.findOneAndUpdate({userId, quesId}, {status: 0 , ansId : 0}) ; 
                return res.status(200).json({ message: "Response cleared" });
            }
            if(existingResponse) {
                await Response.findOneAndUpdate({userId, quesId}, {status, ansId}) ;
                return res.status(200).json({ message: "Response updated" });
            }
            const responseRecieved = new Response({userId, quesId, status, ansId});
            await responseRecieved.save();
            return res.status(200).json({ message: "Response recorded" });
        } catch(err) {
            return res.status(500).json({ message: "Internal Server Error" });  
        }
    },
    preferences : async (req, res)=> {
        try {
            const { userId , preference } = req.body;
            const existingActivity = await Activity.findOne({userId});
            if(existingActivity && existingActivity.preference) {   
                return res.status(400).json({ message: "Preference already set" });
            }
            const activity = new Activity({userId, preference, lastActivity: Date.now(), timeSpent: 0 });
            await activity.save();
            return res.status(200).json({ message: "Preference set" });
        } catch(err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
    getQuestions : async (req, res) => {
        try {
            const { userId } = req.query; 
            const cacheKey = userId; 
            let cachedQuestions = cache.get(cacheKey);
            const [activity, responses] = await Promise.all([
                Activity.findOne({ userId }),
                Response.find({ userId }).select('-_id -userId -__v')
            ]);
            let language = ""; 
            if(activity && activity.preference) {
                language = getLanguage(activity.preference);
            }
            if(cachedQuestions) { 
                return res.status(200).json({ 
                    language : language, 
                    questions : cachedQuestions, 
                    responses : responses || []
                });
            }
            if(activity && Object.keys(activity.questions).length > 0) {
                return res.status(200).json({
                    language : language ,
                    questions : activity.questions,
                    responses : responses 
                })
            }
            const allQuestions = await Question.find({
                subject: { $in: ['HTML', 'SQL', 'CSS', 'Aptitude', language] }
            }).select('-answer').lean();
            const organizedQuestions = {};
            for (const question of allQuestions) {
                if (!organizedQuestions[question.subject]) {
                    organizedQuestions[question.subject] = [];
                }
                organizedQuestions[question.subject].push(question);
            }
            const subjectsOrder = ['HTML', 'SQL', 'CSS', 'Aptitude', language];
            let flatQuestions = [];
            for (const subject of subjectsOrder) {
                const subjectQuestions = organizedQuestions[subject] || [];
                const randomizedQuestions = subjectQuestions.sort(() => Math.random() - 0.5);
                flatQuestions.push(...randomizedQuestions);
            }
            cache.set(cacheKey, flatQuestions);
            await Activity.findOneAndUpdate(
                { userId },
                { questions: flatQuestions },
                { new: true, upsert: true }
            );    
            return res.status(200).json({
                language,
                questions: flatQuestions,
                responses : responses || []
            });
        } catch(err) {
            console.log(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
    submitTest : async(req, res) => {
        try{
            const userId = req.body.userId ;
            await Activity.findOneAndUpdate({userId}, {isSubmitted: true});    
            return res.status(200).json({ message: "Test submitted" });
        } catch(err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = testController; 