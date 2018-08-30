import { fromJS } from 'immutable';

const initialState = fromJS({
  isFetching: true,
  jokes: {},
});

export default function category(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
