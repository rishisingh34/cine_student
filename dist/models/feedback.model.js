"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FeedbackSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
}, { versionKey: false });
const Feedback = (0, mongoose_1.model)('Feedback', FeedbackSchema);
exports.default = Feedback;
