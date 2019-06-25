'use strict';
const LinkedList = require('../LinkedList');

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id });
  },

  getNextWord(db, id) {
    return db
      .from('word')
      .first(
        'original',
        'correct_count',
        'incorrect_count',
      )
      .where({ id })
  },

  getResult(db, something) {
    const sll = new LinkedList();
  }

  
};

module.exports = LanguageService;
