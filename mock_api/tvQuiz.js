import { item, matchable, quiz } from './quizBuilder';

const quizConfig = {
  title: 'TV Characters',
  description: 'Match characters featured in the same show',
  alphabetical: false,
  suddenDeath: true,
  studyMode: false,
  timerSeconds: 180,
};

const quizData = [
  matchable(0, [item(0, 0, 'Daenerys Targaryen'), item(0, 1, 'Jon Snow'), item(0, 2, 'Tyrion Lannister')]),
  matchable(1, [item(1, 0, 'Rory Gilmore'), item(1, 1, 'Lane Kim'), item(1, 2, 'Paris Geller')]),
  matchable(2, [item(2, 0, 'Don Draper'), item(2, 1, 'Peggy Olson'), item(2, 2, 'Roger Sterling')]),
  matchable(3, [item(3, 0, 'Rick Grimes'), item(3, 1, 'Daryl Dixon'), item(3, 2, 'Maggie Greene')]),
  matchable(4, [item(4, 0, 'Kara Thrace'), item(4, 1, 'Gaius Baltar'), item(4, 2, 'Laura Roslin')]),
  matchable(5, [item(5, 0, 'Jack Shephard'), item(5, 1, 'Kate Austen'), item(5, 2, 'Ben Linus')]),
  matchable(6, [item(6, 0, 'Michael Bluth'), item(6, 1, 'Tobias Fünke'), item(6, 2, 'Steve Holt')]),
];

export default quiz(quizData, quizConfig);
