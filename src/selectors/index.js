import { createSelector } from 'reselect';

/* Category selectors */
export const categories = state => state.getIn(['category', 'categories']);
export const activeCategory = state => state.getIn(['category', 'active']);

/** Joke selectors */
export const jokes = state => state.getIn(['joke', 'jokes']);

// Create a memoized selector to fetch a joke by category
export const getJokeById = createSelector(
  jokes,
  activeCategory,
  (jokes, activeCategory) => {
    if (!jokes || !activeCategory) return null;

    return jokes.getIn(['joke', 'jokes', activeCategory]);
  },
);
