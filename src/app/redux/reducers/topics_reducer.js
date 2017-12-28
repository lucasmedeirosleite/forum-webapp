import { LIST_TOPICS } from '../contants';

export default function (state = {}, action) {
  switch (action.type) {
    case LIST_TOPICS:
      return action.payload;
    default:
      return state;
  }
}
