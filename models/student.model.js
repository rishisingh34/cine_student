const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const StudentSchema = new Schema({
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

const StudentModel = model('Student', StudentSchema);

module.exports = StudentModel;