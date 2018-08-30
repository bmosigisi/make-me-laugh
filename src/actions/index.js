const BEGIN = 'BEGIN';
const PROGRESS = 'PROGRESS';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

// Request types can be in one of 4 states:
// BEGIN (to trigger the request), PROGRESS, SUCCESS and FAILURE.
// This helper function
const createRequestTypes = (base) => {
  return [BEGIN, SUCCESS, PROGRESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
};

export const FETCH_CATEGORIES = createRequestTypes('FETCH_CATEGORIES');
export const FETCH_JOKE = createRequestTypes('FETCH_JOKE');

// Action creators
export const triggerFetchJoke = () => {
  return {
    type: FETCH_JOKE.BEGIN,
  };
};
