'use strict';

const authorQuiz = require('./authorQuiz');
const tvQuiz = require('./tvQuiz');
const statesQuiz = require('./statesQuiz');

const db = [authorQuiz, tvQuiz, statesQuiz];

console.log(JSON.stringify(db));
