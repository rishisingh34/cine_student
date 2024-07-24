"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Student', required: true },
    preference: { type: Number },
    lastActivity: { type: Number },
    timeSpent: { type: Number },
    questions: { type: Object, default: {} }
}, { versionKey: false });
const Activity = (0, mongoose_1.model)('Activity', activitySchema);
exports.default = Activity;
