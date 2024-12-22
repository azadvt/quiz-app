const express = require('express');
const quizController = require('../../controllers/quizController');

const router = express.Router();

router.post('/quizzes', quizController.createQuiz);

router.get('/quizzes', quizController.getQuizzes);

router.put('/quizzes/:quizId/questions/:questionId/answer', quizController.updateAnswer);

module.exports = router;
