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

export const CATEGORY = createRequestTypes('CATEGORY');
export const JOKE = createRequestTypes('JOKE');

export const GENERIC_TRIGGER = 'GENERIC_TRIGGER';
export const GENERIC_START = 'GENERIC_START';

// Action creators
export const triggerFetchCategories = () => {
  return {
    type: CATEGORY[BEGIN],
  };
};

export const fetchJokesSuccess = (payload) => {
  return {
    type: JOKE[SUCCESS],
    payload,
  };
};
