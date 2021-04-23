export const JSONHeaders = [
  'application/json',
  'application/vnd.api+json',
];

export const checkWindow = () => typeof window !== 'undefined';

export const createReducer = (
  initialState,
  handlers
) => {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

export function isJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const delayFunc = (time) => new Promise((res) => setTimeout(res, time));

/**
 * Do consistently request until required condition is met by `predicate` function or until `untilTimeout` time pass.
 *
 * @param {Function} operation - function to be repeated
 * @param {Function} predicate - function to check the result and return `Boolean` value
 * @param {number} [interval=1000] - `operation` function call interval. Defaults to `1000` milliseconds
 * @param {number} [untilTimeout=10000] - time to try invoking `operation` function. Returns `false` after.
 *
 * @return {Promise} - `Boolean` value (result of the `predicate` or `false` after `untilTimeout` milliseconds)
 */
export async function waitUntil(operation, predicate, interval = 1000, untilTimeout = 10000) {
  async function* waitUntilGen(operation, predicate, delay, untilTimeout) {
    let cancel = false;
    setTimeout(() => { cancel = true }, untilTimeout);
    while(!cancel) {
      await delayFunc(interval);
      try {
        const res = await operation();
        yield predicate(res);
      } catch (e) { yield false }
    }
  }

  for await (let res of waitUntilGen(operation, predicate, interval, untilTimeout)) {
    if (res) return true;
  }
}
