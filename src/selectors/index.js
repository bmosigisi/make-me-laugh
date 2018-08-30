import { createSelector } from 'reselect';

/* Category selectors */
export const categories = state => state.getIn(['category', 'categories']);
export const categoriesFetching = state => state.getIn(['category', 'isFetching']);
export const dialogOpen = state => state.getIn(['category', 'dialogOpen']);

/** Joke selectors */
export const jokes = state => state.getIn(['joke', 'jokes']);
export const activeCategory = state => state.getIn(['joke', 'activeCategory']);
export const getIsFetchingJoke = state => state.getIn(['joke', 'isFetching']);

// Create a memoized selector to fetch a joke by category
export const getActiveJoke = createSelector(
  jokes,
  activeCategory,
  (jokes, activeCategory) => {
    if (!jokes || !activeCategory) return '';

    return jokes.get(activeCategory);
  },
);

export const getActiveJokeText = createSelector(
  getActiveJoke,
  (activeJoke) => {
    if (!activeJoke) return '';

    return activeJoke.get('value');
  },
);

export const getActiveJokeIconUrl = createSelector(
  getActiveJoke,
  (activeJoke) => {
    if (!activeJoke) return '';

    return activeJoke.get('iconUrl');
  },
);
