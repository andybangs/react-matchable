import { item, matchable, quiz } from './quizBuilder';

const quizConfig = {
  title: 'Famous Literary Novels',
  description: 'Match the title to the author',
  alphabetical: false,
  suddenDeath: false,
  studyMode: true,
  timerSeconds: 150,
};

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

export default quiz(quizData, quizConfig);
