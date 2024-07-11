"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const test_controller_1 = __importDefault(require("../controllers/test.controller"));
const feedback_controller_1 = __importDefault(require("../controllers/feedback.controller"));
// import auth from '../middleware/auth.middleware'
router.post('/login', auth_controller_1.default.login);
router.post('/response', test_controller_1.default.response);
router.post('/preferences', test_controller_1.default.preferences);
router.get('/questions', test_controller_1.default.getQuestions);
router.get('/getPreference', test_controller_1.default.getPreference);
router.get('/feedbackQuestions', feedback_controller_1.default.feedbackQuestions);
router.post('/submitFeedback', feedback_controller_1.default.submitFeedback);
router.get('/getResponses', test_controller_1.default.getResponses);
router.get('/timeRemaining', test_controller_1.default.getTime);
exports.default = router;
