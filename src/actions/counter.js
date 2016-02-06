import { INC, DEC } from '../constants/counter';

export function inc() {
  return {
    type: INC,
  };
}

export function dec() {
  return {
    type: DEC,
  };
}
