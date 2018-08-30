// Request types can be in one of 4 states:
// BEGIN (to trigger the request), PROGRESS, SUCCESS and FAILURE.
// This helper function allows you to define these states for any request action.
const createRequestTypes = (base) => {
  return ['BEGIN', 'SUCCESS', 'PROGRESS', 'FAILURE'].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
};

const FETCH_CATEGORIES = createRequestTypes('FETCH_CATEGORIES');
const FETCH_JOKE = createRequestTypes('FETCH_JOKE');

export const actionTypes = {
  FETCH_CATEGORIES,
  FETCH_JOKE,
  OPEN_DIALOG: 'OPEN_DIALOG',
  SET_ACTIVE_CATEGORY: 'SET_ACTIVE_CATEGORY',
};

// --- Action creators ----
// Adopts a convention where every action contains two keys: type and a payload object.

export const triggerFetchJoke = (category) => {
  return {
    type: actionTypes.FETCH_JOKE.BEGIN,
    payload: category,
  };
};

export const triggerOpenDialog = (payload) => {
  return {
    type: actionTypes.OPEN_DIALOG,
    payload,
  };
};
