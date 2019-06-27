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

  updateHead(db, language_id, head) {
    return db
      .from('language')
      .where('id', language_id)
      .update({ head })
  },

  // serializeWord(word) {
  //   return {
  //     id: word.id,
  //     original: word.original,
  //     translation: word.translation,
  //     memory_value: word.memory_value,
  //     correct_count: word.correct_count,
  //     incorrect_count: word.incorrect_count,
  //     language_id: word.language_id,
  //     next: word.next,
  //   }
  // },

  correctAnswer(db, word) {
    let { memory_value: memVal, id, correct_count} = word;
    
    memVal = memVal * 2;
    correct_count++;

    db
      .from('word')
      .where({ id })
      .update({
        'memory_value': memVal,
        'correct_count': correct_count,
      });
    
    return;
  },

  incrementTotal(db, language_id) {
    return db
      .from('language')
      .where('id', language_id)
      .increment('total_score', 1);
  },

  incorrectAnswer(db, id) {
    db
      .from('word')
      .where({ id })
      .increment('incorrect_count', 1)
      .update('memory_value', 1);
    
    return;
  },

  getTotalScore(db, language_id) {
    return db
      .from('language')
      .first(
        'total_score',
      )
      .where('id', language_id);
  },

  
};

module.exports = LanguageService;
