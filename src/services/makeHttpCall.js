import axios from 'axios';
import { stringify } from 'querystring';

const defaultOptions = {
  headers: {},
  queryParams: null,
};

// Export function to make http calls.
// Having all http requests originate from one source provides convenience for extending functionality
// e.g. instrumentation such as user analytics, error reporting to third party services e.g. Raven,
// implementing client-side caching strategies, adding custom headers etc...
export default function makeHttpCall(
  url = '',
  options = defaultOptions,
) {
  const rootPath = 'https://api.chucknorris.io';
  let fullPath = `${rootPath}${url}`;
  if (options.queryParams) {
    const queryString = stringify(options.queryParams);
    fullPath = `${fullPath}?${queryString}`;
  }

  return axios({
    url: fullPath,
    method: options.method || 'GET',
    headers: options.headers,
  }).then(response => ({
    data: response.data,
    success: response.status === 200,
  })).catch(err => ({
    data: null,
    success: false,
    message: err.message,
  }));
}
