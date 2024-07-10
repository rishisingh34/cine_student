import { Router } from "express";
const router = Router();
import authController from '../controllers/auth.controller'
import testController  from '../controllers/test.controller'
import feedbackController from '../controllers/feedback.controller'
// import auth from '../middleware/auth.middleware'

router.post('/login',authController.login);
router.post('/response',testController.response);
router.post('/preferences',testController.preferences);
router.get('/questions', testController.getQuestions);
router.get('/getPreference', testController.getPreference); 
router.get('/feedbackQuestions',feedbackController.feedbackQuestions);
router.post('/submitFeedback',feedbackController.submitFeedback);
router.get('/getResponses',testController.getResponses);
router.get('/timeRemaining',testController.getTime);

export default router;