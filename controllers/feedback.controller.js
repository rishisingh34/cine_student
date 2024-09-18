const Feedback = require('../models/feedback.model');
const FeedbackResponseModel = require('../models/feedbackResponse.model');
const feedbackController = {
    feedbackQuestions: async (req, res) => {
        try {
            const feedbackQuestions = await Feedback.find();
            return res.status(200).json({ feedbackQuestions });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    submitFeedback: async (req, res) => {
        try {
            const { userId, response } = req.body;
            if (!response) {
                return res.status(400).json({ message: "Response is required" });
            }
            const feedbackResponse = new FeedbackResponseModel({
                student: userId,
                response: response
            });
            await feedbackResponse.save();
            return res.status(200).json({ message: "Feedback recorded" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};
module.exports = feedbackController;