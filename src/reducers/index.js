import category from './category';
import joke from './joke';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  category,
  joke,
});

export default reducers;