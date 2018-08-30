import { fromJS } from 'immutable';
import { actionTypes } from '../actions';

const initialState = fromJS({
  isFetching: true,
  jokes: {},
  activeCategory: null,
});

export default function category(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.FETCH_JOKE.BEGIN: {
      return state.set('activeCategory', action.payload);
    }
    case actionTypes.FETCH_JOKE.PROGRESS: {
      return state.set('isFetching', true);
    }
    case actionTypes.FETCH_JOKE.SUCCESS: {
      return state
        .set('isFetching', false)
        .setIn(['jokes', action.payload.category], fromJS(action.payload.joke));
    }
    case actionTypes.FETCH_JOKE.FAILURE: {
      return state.set('isFetching', false);
    }
    default:
      return state;
  }
}
