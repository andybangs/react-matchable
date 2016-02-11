import React, { PropTypes } from 'react';
import { START, PLAYING, PAUSED, END } from '../constants/gameStates';
import Start from './Start';
import Playing from './Playing';
import Paused from './Paused';
import End from './End';

const Quiz = (props) => {
  const { quiz, actions } = props;

  switch (quiz.gameState) {
    case START:
      return (
        <Start
          title={quiz.title}
          description={quiz.description}
          setGameState={actions.setGameState}
        />
      );

    case PLAYING:
      return (
        <Playing
          columns={quiz.columns}
          guessesRemaining={quiz.guessesRemaining}
          correct={quiz.correct}
          wrong={quiz.wrong}
          attempted={quiz.attempted}
          timerSeconds={quiz.timerSeconds}
          setGameState={actions.setGameState}
          selectItem={actions.selectItem}
        />
      );

    case PAUSED:
      return (
        <Paused
          guessesRemaining={quiz.guessesRemaining}
          correct={quiz.correct}
          wrong={quiz.wrong}
          timerSeconds={quiz.timerSeconds}
          setGameState={actions.setGameState}
        />
      );

    case END:
      return (
        <End
          columns={quiz.columns}
          correct={quiz.correct}
          quizLength={quiz.columns[0].length}
          reset={actions.reset}
        />
      );

    default:
      return (
        <Start
          title={quiz.title}
          description={quiz.description}
          setGameState={actions.setGameState}
        />
      );
  }
};

Quiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default Quiz;
