import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import topicsReducer from './topics_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  topics: topicsReducer
});

export default rootReducer;
