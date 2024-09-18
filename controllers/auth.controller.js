const StudentModel = require('../models/student.model');
const Activity = require('../models/activity.model');

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
            await Activity.findOneAndUpdate({ userId: student.id }, { lastActivity: Date.now() });

            return res.status(200).json({ message: "Login successful", userId: student.id });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};
module.exports = authController;