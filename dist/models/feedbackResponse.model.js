"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FeedbackResponseSchema = new mongoose_1.Schema({
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Student', required: true },
    response: [{
            _id: false,
            question: { type: String, required: true },
            ans: { type: String, required: true }
        }]
}, { versionKey: false });
const FeedbackResponseModel = (0, mongoose_1.model)('FeedbackResponse', FeedbackResponseSchema);
exports.default = FeedbackResponseModel;
