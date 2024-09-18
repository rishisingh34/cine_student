const { Router } = require('express');
const router = Router(); 
const authController = require('../controllers/auth.controller');
const testController = require('../controllers/test.controller');
const feedbackController = require('../controllers/feedback.controller');

router.post('/login',authController.login);
router.post('/response',testController.response);
router.post('/preferences',testController.preferences);
router.get('/questions', testController.getQuestions); 
router.get('/feedbackQuestions',feedbackController.feedbackQuestions);
router.post('/submitFeedback',feedbackController.submitFeedback);
router.post('/submitTest', testController.submitTest); 

module.exports = router;