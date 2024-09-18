const StudentModel = require('../models/student.model');
const Activity = require('../models/activity.model');
const getLanguage = require('../utils/getLanguage');

const authController = {
    login: async (req, res) => {
        try {
            const { studentNumber, password } = req.body;
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
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};
module.exports = authController;