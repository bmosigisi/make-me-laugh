import makeHttpCall from './makeHttpCall';

/**
 * @param {String} category
 *
 * @return Promise
 */
export const show = (category) => {
  return makeHttpCall('/jokes/random', {
    queryParams: {
      category,
    },
  });
};
