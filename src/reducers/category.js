import { fromJS } from 'immutable';
import { actionTypes } from '../actions';

const initialState = fromJS({
  isFetching: true,
  categories: [],
  dialogOpen: false,
});

export default function category(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES.SUCCESS: {
      return state
        .set('isFetching', false)
        .set('categories', fromJS(action.payload));
    }
    case actionTypes.FETCH_CATEGORIES.FAILURE:
      return state.set('isFetching', false);
    case actionTypes.OPEN_DIALOG: {
      return state.set('dialogOpen', action.payload);
    }
    default:
      return state;
  }
}
