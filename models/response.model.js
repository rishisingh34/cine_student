const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const responseSchema = new Schema({
  quesId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  status: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  ansId: { type: Number, required: true },
}, { versionKey: false });

const Response = model('Response', responseSchema);

module.exports = Response;
