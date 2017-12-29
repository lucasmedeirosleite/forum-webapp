import _ from 'lodash';
import { LIST_TOPICS, FETCH_TOPIC, DELETE_TOPIC } from '../constants';

export default function (state = {}, action) {
  switch (action.type) {
    case LIST_TOPICS:
      return _.mapKeys(action.payload, 'id');
    case FETCH_TOPIC:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_TOPIC:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
