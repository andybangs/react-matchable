import { TICK_TIMER } from '../constants/timer';

export function tickTimer() {
  return {
    type: TICK_TIMER,
  };
}
