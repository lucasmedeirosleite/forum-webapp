import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import topicsReducer from './topics_reducer';
import postsReducer from './posts_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  topics: topicsReducer,
  posts: postsReducer
});

export default rootReducer;
