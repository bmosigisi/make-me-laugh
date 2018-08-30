import makeHttpCall from './index';

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
