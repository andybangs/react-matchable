import React, { PropTypes } from 'react';
import { START, PLAYING, PAUSED, END } from '../constants/gameStates';
import Start from './Start';
import Playing from './Playing';
import Paused from './Paused';
import End from './End';

const Quiz = (props) => {
  const { quiz, setGameState, reset } = props;

  switch (quiz.gameState) {
    case START:
      return (
        <Start
          title={quiz.title}
          description={quiz.description}
          gameState={quiz.gameState}
          setGameState={setGameState}
        />
      );

    case PLAYING:
      return (
        <Playing
          guessesRemaining={quiz.guessesRemaining}
          correct={quiz.correct}
          wrong={quiz.wrong}
          gameState={quiz.gameState}
          setGameState={setGameState}
        />
      );

    case PAUSED:
      return (
        <Paused
          gameState={quiz.gameState}
          setGameState={setGameState}
        />
      );

    case END:
      return (
        <End
          guessesRemaining={quiz.guessesRemaining}
          correct={quiz.correct}
          wrong={quiz.wrong}
          gameState={quiz.gameState}
          reset={reset}
        />
      );

    default:
      return (
        <Start
          gameState={quiz.gameState}
          setGameState={setGameState}
        />
      );
  }
};

Quiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  setGameState: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default Quiz;
