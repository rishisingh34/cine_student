const StudentModel = require('../models/student.model');
const Activity = require('../models/activity.model');
const getLanguage = require('../utils/getLanguage');
const { RECAPTCHA_SECRET_KEY } = require('../config/env.config');   
const axios = require('axios');

const authController = {
    login: async (req, res) => {
        try {
            const { studentNumber, password, token } = req.body;
            const secretKey = process.env.RECAPTCHA_SECRET_KEY;
            const formData = `secret=${secretKey}&response=${token}`;
            const reCaptchaResponse = await axios.post(
                'https://www.google.com/recaptcha/api/siteverify',
                formData,
                {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                }
            );
            if (!reCaptchaResponse.data.success || reCaptchaResponse.data.score <= 0.5) {
                return res.status(403).json({ error: 'ReCaptcha verification failed' });
            }
            const student = await StudentModel.findOne({ studentNumber, password });
            if (!student) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const activity = await Activity.findOne({ userId: student.id });
            if (activity && activity.isSubmitted) {
                return res.status(400).json({ message: "Test already submitted" });
            }
            const totalTime = 1 * 60 * 60 * 1000;
            let remainingTime = totalTime;
            if (activity && activity.timeSpent) {
                remainingTime = totalTime - activity.timeSpent;
            }
            let language = "Invalid preference number";
            if (activity && activity.preference !== undefined) {
                language = getLanguage(activity.preference);
            } 
            await Activity.findOneAndUpdate({ userId: student.id }, { lastActivity: Date.now()});
            return res.status(200).json({
                message : "Login successful",
                userId: student.id,
                remainingTime: remainingTime,
                language: language,
            });    
        } catch (error) {
            return res.status(500).json({ message: error  });
        }
    }
};
module.exports = authController;