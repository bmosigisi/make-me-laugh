import { fromJS } from 'immutable';
import { FETCH_CATEGORIES } from '../actions';

const initialState = fromJS({
  isFetching: true,
  categories: [],
  active: null,
});

export default function category(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_CATEGORIES.SUCCESS: {
      return state
        .set('isFetching', false)
        .set('categories', fromJS(action.payload));
    }
    case FETCH_CATEGORIES.FAILURE:
      return state.set('isFetching', false);
    default:
      return state;
  }
}
