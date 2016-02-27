'use strict';

const flatten = require('lodash').flatten;
const shuffle = require('lodash').shuffle;
const sortBy = require('lodash').sortBy;
const take = require('lodash').take;
const START = 'START';

/* -- TYPES --------------------------------------------------------------------
type alias Item = {
  mid :: Number,
  id :: Number,
  value :: String,
  selected :: Bool,
  focused :: Bool,
}

type alias Matchable = {
  id :: Number,
  items :: Array Item,
  matched :: Bool,
}

type alias QuizData = Array Matchable

type alias QuizConfig = {
  title :: String,
  description :: String,
  alphabetical :: Bool,
  suddenDeath :: Bool,
  studyMode :: Bool,
  timerSeconds :: Number,
}

type alias QuizState = {
  title :: String,
  description :: String,
  itemIds :: Array Number,
  columns :: Array (Array Matchable),
  guessesRemaining :: Number,
  suddenDeath :: Bool,
  studyMode :: Bool,
  correct :: Number,
  wrong :: Number,
  attempted :: Array [Item.mid, Item.id],
  gameState :: String,
  timerSeconds :: Number,
}
----------------------------------------------------------------------------- */

// parseItemIds :: Array Matchable -> Array Number
function parseItemIds(ms) {
  return flatten(take(ms).map(m => m.items)).map(i => i.id);
}

// alphaSort :: Array Matchable -> Array Matchable
function alphaSort(ms, id) {
  return sortBy(ms, m => m.items[id].value);
}

// parseColumns :: Array Matchable -> Array Number -> (a -> a) -> Array (Array Matchable)
function parseColumns(ms, itemIds, sortFn) {
  return itemIds.map(id =>
    sortFn(ms, id).map(m =>
      Object.assign({}, m, { items: m.items.filter(i => i.id === id) })
    )
  );
}

// item :: Number -> Number -> String -> Item
exports.item = function item(mid, id, value) {
  return {
    mid,
    id,
    value,
    selected: false,
    focused: false,
  };
};

// matchable :: Number -> Array Item -> Matchable
exports.matchable = function matchable(id, items) {
  return {
    id,
    items,
    matched: false,
  };
};

// quiz :: QuizData -> QuizConfig -> QuizState
exports.quiz = function quiz(data, config) {
  const itemIdsArr = parseItemIds(data);
  const sortFn = config.alphabetical ? alphaSort : shuffle;
  const columnsArr = parseColumns(data, itemIdsArr, sortFn);

  return {
    title: config.title,
    description: config.description,
    itemIds: itemIdsArr,
    columns: columnsArr,
    guessesRemaining: data.length,
    suddenDeath: config.suddenDeath,
    studyMode: config.studyMode,
    correct: 0,
    wrong: 0,
    attempted: [],
    gameState: START,
    timerSeconds: config.timerSeconds,
  };
};
