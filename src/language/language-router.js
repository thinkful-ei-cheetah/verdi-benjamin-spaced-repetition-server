'use strict';

const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');
const LinkedList = require('../LinkedList');

const languageRouter = express.Router();

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      );

      if (!language)
        return res.status(404).json({
          error: 'You don\'t have any languages',
        });

      req.language = language;
      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      );

      res.json({
        language: req.language,
        words,
      });
      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .get('/head', async (req, res, next) => {
    try {
      const word = await LanguageService.getNextWord(
        req.app.get('db'),
        req.language.head
      );
      
      res.json({
          nextWord: word.original,
          totalScore: req.language.total_score,
          wordCorrectCount: word.correct_count,
          wordIncorrectCount: word.incorrect_count,
      });
      next();
    } catch (error) {
      next(error);
    }
    
  });

languageRouter
  .post('/guess', async (req, res, next) => {
    try {
      const sll = new LinkedList();
      const word = await LanguageService.getNextWord(
        req.app.get('db'),
        req.language.head
      );

      res.json({
        nextWord: word.original,
        totalScore: req.language.total_score,
        wordCorrectCount: word.correct_count,
        wordIncorrectCount: word.incorrect_count,
      });
      next();
    } catch (error) {
      next(error);
    }
  });

module.exports = languageRouter;
