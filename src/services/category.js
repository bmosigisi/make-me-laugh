import makeHttpCall from './index';

/**
 * Get listing of all categories from API.
 *
 * @return Promise
 */
export const getCategories = () => makeHttpCall('/jokes/categories');
