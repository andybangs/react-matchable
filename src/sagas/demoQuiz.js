import { flatten, shuffle, take } from 'lodash';
import { START } from '../constants/gameStates';

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

type alias Data = Array Matchable

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
  suddenDeath :: Bool,
  studyMode :: Bool,
  attempted :: Array [Item.mid, Item.id],
  gameState :: String,
  timerSeconds :: Number,
}

type alias Action = String
----------------------------------------------------------------------------- */

// item :: Number -> Number -> String -> Item
function item(mid, id, value) {
  return {
    mid,
    id,
    value,
    selected: false,
    focused: false,
  };
}

// matchable :: Number -> Array Item -> Matchable
function matchable(id, items) {
  return {
    id,
    items,
    matched: false,
  };
}

// quizData :: Data
const quizData = [
  matchable(0, [item(0, 0, 'Pride and Prejudice'), item(0, 1, 'Jane Austen')]),
  matchable(1, [item(1, 0, '1984'), item(1, 1, 'George Orwell')]),
  matchable(2, [item(2, 0, 'The Great Gatsby'), item(2, 1, 'F. Scott Fitzgerald')]),
  matchable(3, [item(3, 0, 'Jane Eyre'), item(3, 1, 'Charlotte Brontë')]),
  matchable(4, [item(4, 0, 'Crime and Punishment'), item(4, 1, 'Fyodor Dostoyevsky')]),
  matchable(5, [item(5, 0, 'Wuthering Heights'), item(5, 1, 'Emily Brontë')]),
  matchable(6, [item(6, 0, 'Lolita'), item(6, 1, 'Vladimir Nabokov')]),
  matchable(7, [item(7, 0, 'The Adventures of Huckleberry Finn'), item(7, 1, 'Mark Twain')]),
  matchable(8, [item(8, 0, 'Of Mice and Men'), item(8, 1, 'John Steinbeck')]),
  matchable(9, [item(9, 0, 'The Count of Monte Cristo'), item(9, 1, 'Alexandre Dumas')]),
  matchable(10, [item(10, 0, 'Brave New World'), item(10, 1, 'Aldous Huxley')]),
  matchable(11, [item(11, 0, 'One Hundred Years of Solitude'), item(11, 1, 'Gabriel Garcí­a Márquez')]),
];

// const quizData = [
//   matchable(0, [item(0, 0, 'Daenerys Targaryen'), item(0, 1, 'Jon Snow'), item(0, 2, 'Tyrion Lannister')]),
//   matchable(1, [item(1, 0, 'Rory Gilmore'), item(1, 1, 'Lane Kim'), item(1, 2, 'Paris Geller')]),
//   matchable(2, [item(2, 0, 'Don Draper'), item(2, 1, 'Peggy Olson'), item(2, 2, 'Roger Sterling')]),
//   matchable(3, [item(3, 0, 'Rick Grimes'), item(3, 1, 'Daryl Dixon'), item(3, 2, 'Maggie Greene')]),
//   matchable(4, [item(4, 0, 'Kara Thrace'), item(4, 1, 'Gaius Baltar'), item(4, 2, 'Laura Roslin')]),
//   matchable(5, [item(5, 0, 'Jack Shephard'), item(5, 1, 'Kate Austen'), item(5, 2, 'Ben Linus')]),
//   matchable(6, [item(6, 0, 'Michael Bluth'), item(6, 1, 'Tobias Fünke'), item(6, 2, 'Steve Holt')]),
// ];

// parseItemIds :: Array Matchable -> Array Number
function parseItemIds(ms) {
  return flatten(take(ms).map(m => m.items)).map(i => i.id);
}

// parseColumns :: Array Matchable -> Array Number -> Array (Array Matchable)
function parseColumns(ms, itemIds) {
  return itemIds.map(id =>
    shuffle(ms).map(m => ({ ...m, items: m.items.filter(i => i.id === id) }))
  );
}

const itemIdsArr = parseItemIds(quizData);
const columnsArr = parseColumns(quizData, itemIdsArr);
const numGuesses = flatten(take(columnsArr)).length;

// demoQuiz :: QuizState
const demoQuiz = {
  title: 'Demo Quiz',
  description: 'This is not the quiz you were looking for...',
  itemIds: itemIdsArr,
  columns: columnsArr,
  guessesRemaining: numGuesses,
  suddenDeath: false,
  studyMode: true,
  correct: 0,
  wrong: 0,
  attempted: [],
  gameState: START,
  timerSeconds: 120,
};

export default demoQuiz;
