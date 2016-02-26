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
//   matchable(0, [item(0, 0, 'Alabama'), item(0, 1, 'Montgomery')]),
//   matchable(1, [item(1, 0, 'Alaska'), item(1, 1, 'Juneau')]),
//   matchable(2, [item(2, 0, 'Arizona'), item(2, 1, 'Phoenix')]),
//   matchable(3, [item(3, 0, 'Arkansas'), item(3, 1, 'Little Rock')]),
//   matchable(4, [item(4, 0, 'California'), item(4, 1, 'Sacramento')]),
//   matchable(5, [item(5, 0, 'Colorado'), item(5, 1, 'Denver')]),
//   matchable(6, [item(6, 0, 'Connecticut'), item(6, 1, 'Hartford')]),
//   matchable(7, [item(7, 0, 'Delaware'), item(7, 1, 'Dover')]),
//   matchable(8, [item(8, 0, 'District of Columbia'), item(8, 1, 'Washington')]),
//   matchable(9, [item(9, 0, 'Florida'), item(9, 1, 'Tallahassee')]),
//   matchable(10, [item(10, 0, 'Georgia'), item(10, 1, 'Atlanta')]),
//   matchable(11, [item(11, 0, 'Hawaii'), item(11, 1, 'Honolulu')]),
//   matchable(12, [item(12, 0, 'Idaho'), item(12, 1, 'Boise')]),
//   matchable(13, [item(13, 0, 'Illinois'), item(13, 1, 'Sprinfield')]),
//   matchable(14, [item(14, 0, 'Indiana'), item(14, 1, 'Indianapolis')]),
//   matchable(15, [item(15, 0, 'Iowa'), item(15, 1, 'Des Moines')]),
//   matchable(16, [item(16, 0, 'Kansas'), item(16, 1, 'Topeka')]),
//   matchable(17, [item(17, 0, 'Kentucky'), item(17, 1, 'Frankfort')]),
//   matchable(18, [item(18, 0, 'Louisiana'), item(18, 1, 'Baton Rouge')]),
//   matchable(19, [item(19, 0, 'Maine'), item(19, 1, 'Augusta')]),
//   matchable(20, [item(20, 0, 'Maryland'), item(20, 1, 'Annaplis')]),
//   matchable(21, [item(21, 0, 'Massachusetts'), item(21, 1, 'Boston')]),
//   matchable(22, [item(22, 0, 'Michigan'), item(22, 1, 'Lansing')]),
//   matchable(23, [item(23, 0, 'Minnesota'), item(23, 1, 'Saint Paul')]),
//   matchable(24, [item(24, 0, 'Mississippi'), item(24, 1, 'Jackson')]),
//   matchable(25, [item(25, 0, 'Missouri'), item(25, 1, 'Jefferson City')]),
//   matchable(26, [item(26, 0, 'Montana'), item(26, 1, 'Helena')]),
//   matchable(27, [item(27, 0, 'Nebraska'), item(27, 1, 'Lincoln')]),
//   matchable(28, [item(28, 0, 'Nevada'), item(28, 1, 'Carson City')]),
//   matchable(29, [item(29, 0, 'New Hampshire'), item(29, 1, 'Concord')]),
//   matchable(30, [item(30, 0, 'New Jersey'), item(30, 1, 'Trenton')]),
//   matchable(31, [item(31, 0, 'New Mexico'), item(31, 1, 'Santa Fe')]),
//   matchable(32, [item(32, 0, 'New York'), item(32, 1, 'Albany')]),
//   matchable(33, [item(33, 0, 'North Carolina'), item(33, 1, 'Raleigh')]),
//   matchable(34, [item(34, 0, 'North Dakota'), item(34, 1, 'Bismark')]),
//   matchable(35, [item(35, 0, 'Ohio'), item(35, 1, 'Columbus')]),
//   matchable(36, [item(36, 0, 'Oklahoma'), item(36, 1, 'Oklahoma City')]),
//   matchable(37, [item(37, 0, 'Oregon'), item(37, 1, 'Salem')]),
//   matchable(38, [item(38, 0, 'Pennsylvania'), item(38, 1, 'Harrisburg')]),
//   matchable(39, [item(39, 0, 'Rhode Island'), item(39, 1, 'Providence')]),
//   matchable(40, [item(40, 0, 'South Carolina'), item(40, 1, 'Columbia')]),
//   matchable(41, [item(41, 0, 'South Dakota'), item(41, 1, 'Pierre')]),
//   matchable(42, [item(42, 0, 'Tennessee'), item(42, 1, 'Nashville')]),
//   matchable(43, [item(43, 0, 'Texas'), item(43, 1, 'Austin')]),
//   matchable(44, [item(44, 0, 'Utah'), item(44, 1, 'Salt Lake City')]),
//   matchable(45, [item(45, 0, 'Vermont'), item(45, 1, 'Montpelier')]),
//   matchable(46, [item(46, 0, 'Virginia'), item(46, 1, 'Richmond')]),
//   matchable(47, [item(47, 0, 'Washington'), item(47, 1, 'Olympia')]),
//   matchable(48, [item(48, 0, 'West Virginia'), item(48, 1, 'Charleston')]),
//   matchable(49, [item(49, 0, 'Wisconsin'), item(49, 1, 'Madison')]),
//   matchable(50, [item(50, 0, 'Wyoming'), item(50, 1, 'Cheyenne')]),
// ];

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
