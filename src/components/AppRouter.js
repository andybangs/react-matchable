import React, { PropTypes } from 'react';
import { START, PLAYING, PAUSED, END } from '../constants/gameStates';
import Start from './Start';
import Playing from './Playing';
import Paused from './Paused';
import End from './End';

const AppRouter = ({ quiz, timer, actions }) => {
  switch (quiz.data.gameState) {
    case START:
      return (
        <Start
          title={quiz.data.title}
          description={quiz.data.description}
          setState={actions.setState}
        />
      );

    case PLAYING:
      return (
        <Playing
          gameState={quiz.data.gameState}
          itemIds={quiz.data.itemIds}
          columns={quiz.data.columns}
          guessesRemaining={quiz.data.guessesRemaining}
          correct={quiz.data.correct}
          wrong={quiz.data.wrong}
          attempted={quiz.data.attempted}
          timerSeconds={timer.seconds}
          setState={actions.setState}
          selectItem={actions.selectItem}
        />
      );

    case PAUSED:
      return (
        <Paused
          guessesRemaining={quiz.data.guessesRemaining}
          correct={quiz.data.correct}
          wrong={quiz.data.wrong}
          timerSeconds={timer.seconds}
          setState={actions.setState}
        />
      );

    case END:
      return (
        <End
          gameState={quiz.data.gameState}
          itemIds={quiz.data.itemIds}
          columns={quiz.data.columns}
          correct={quiz.data.correct}
          timerSeconds={timer.seconds}
          toggleFocus={actions.toggleFocus}
          resetState={actions.resetState}
        />
      );

    default:
      return (
        <Start
          title={''}
          description={'Loading...'}
          setState={() => console.log('Loading...')}
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
