"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StudentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    studentNumber: { type: String, required: true },
    branch: { type: String, required: true },
    gender: { type: String, required: true },
    residency: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String },
    isVerified: { type: Boolean, required: true, default: false }
}, { versionKey: false });
const StudentModel = (0, mongoose_1.model)('Student', StudentSchema);
exports.default = StudentModel;
