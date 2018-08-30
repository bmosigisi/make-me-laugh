import { combineReducers } from 'redux';

import category from './category';
import joke from './joke';

const reducers = combineReducers({
  category,
  joke,
});

export default reducers;
