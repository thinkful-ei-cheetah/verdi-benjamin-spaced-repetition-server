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

  getWord(db, id) {
    return db
      .from('word')
      .first(
        'original',
        'correct_count',
        'incorrect_count',
        'translation',
        'memory_value',
        'next',
        'language_id',
      )
      .where({ id })
  },

  getResult(db, id, answer) {
    
    const word = db
    .from('word')
    .first(
      'translation',
      'correct_count',
      'incorrect_count',
      'memory_value',
      'next',
      'language_id',
      )
      .where({ id })

    const { next: head, language_id } = word;
    db
      .from('language')
      .where('language_id', language_id)
      .update({ head })
    
    if (word.translation === answer) {
      let { memory_value: memVal } = word;
      memVal = memVal * 2;

      db
        .from('word')
        .where({ id })
        .increment('correct_count', 1)
        .update('memory_value', memval);
      
      return true;
    } else {
      db
        .from('word')
        .where({ id })
        .increment('incorrect_count', 1)
        .update('memory_value', 1);

      return false;
    }
  }

  
};

module.exports = LanguageService;
