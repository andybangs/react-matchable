import React, { PropTypes } from 'react';
import { START, PLAYING, PAUSED, END } from '../constants/gameStates';
import Start from './Start';
import Playing from './Playing';
import Paused from './Paused';
import End from './End';

const AppRouter = ({ quiz, timer, actions }) => {
  switch (quiz.gameState) {
    case START:
      return (
        <Start
          title={quiz.title}
          description={quiz.description}
          setState={actions.setState}
        />
      );

    case PLAYING:
      return (
        <Playing
          gameState={quiz.gameState}
          itemIds={quiz.itemIds}
          columns={quiz.columns}
          guessesRemaining={quiz.guessesRemaining}
          correct={quiz.correct}
          wrong={quiz.wrong}
          attempted={quiz.attempted}
          timerSeconds={timer.seconds}
          setState={actions.setState}
          selectItem={actions.selectItem}
        />
      );

    case PAUSED:
      return (
        <Paused
          guessesRemaining={quiz.guessesRemaining}
          correct={quiz.correct}
          wrong={quiz.wrong}
          timerSeconds={timer.seconds}
          setState={actions.setState}
        />
      );

    case END:
      return (
        <End
          gameState={quiz.gameState}
          itemIds={quiz.itemIds}
          columns={quiz.columns}
          correct={quiz.correct}
          timerSeconds={timer.seconds}
          toggleFocus={actions.toggleFocus}
          resetState={actions.resetState}
        />
      );

    default:
      return (
        <Start
          title={quiz.title}
          description={quiz.description}
          setState={actions.setState}
        />
      );
  }
};

AppRouter.propTypes = {
  quiz: PropTypes.object.isRequired,
  timer: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default AppRouter;
