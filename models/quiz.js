const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [optionSchema], required: true },
  explanation: { type: String, required: true },
  attended: { type: Boolean, default: false },
  userAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option',
    default: null,
  },
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: {
    type: [questionSchema],
    validate: {
      validator: (value) => value.length === 5,
      message: 'A quiz must have exactly five questions.',
    },
    required: true,
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
