const Quiz = require('../models/quiz');
const { sendError, sendResponse } = require('../helpers/utils');
const HTTPStatus = require('http-status');

const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);

    await quiz.save();
    console.log(
      'Quiz created successfully',
      res,
      HTTPStatus.CREATED,
      'Quiz created successfully',
      quiz
    );

    return sendResponse(res, quiz, HTTPStatus.CREATED, 'Quiz created successfully');
  } catch (error) {
    global.logger.error(error);
    sendError(res, error.message);
  }
};

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    return sendResponse(res, quizzes, HTTPStatus.OK, 'Quizzes fetched successfully');
  } catch (error) {
    global.logger.error(error);
    sendError(res, error.message);
  }
};

const updateAnswer = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { selectedOptionId, questionId } = req.body;
    console.log('updateAnswer', quizId, questionId, selectedOptionId);

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return sendError(res, 'Quiz not found', HTTPStatus.NOT_FOUND);
    }
    console.log('quiz', quiz);

    const question = quiz.questions.id(questionId);
    console.log('question', question);

    if (!question) {
      return sendError(res, 'Question not found', HTTPStatus.NOT_FOUND);
    }

    question.userAnswer = selectedOptionId;

    await quiz.save();

    return sendResponse(res, quiz, HTTPStatus.OK, 'Answer updated successfully');
  } catch (error) {
    global.logger.error(error);
    sendError(res, error.message);
  }
};

module.exports = { createQuiz, getQuizzes, updateAnswer };
