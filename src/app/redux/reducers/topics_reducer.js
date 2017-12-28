import _ from 'lodash';
import { LIST_TOPICS, DELETE_TOPIC } from '../contants';

export default function (state = {}, action) {
  switch (action.type) {
    case LIST_TOPICS:
      return action.payload;
    case DELETE_TOPIC:
      return _.omitBy(state, topic => {
        return topic.id === action.payload;
      });
    default:
      return state;
  }
}
