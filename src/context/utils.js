import React, { useContext } from 'react';
import { curry, get } from 'lodash'

export const useCreateUseContext = (
  StateContext,
  DispatchContext
) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return [state, dispatch];
}

export const getDataByPath = curry((data, path) => get(data, path));

/**
 * Wraps each Action with Dispatch
 *
 * @param {Function} dispatch - dispatch function
 * @param {Object} actions - action creators
 *
 * @return {Object} - wrapped action creators with dispatch function
 */
export const makeDispatchable = (dispatch, actions) => {
  return Object.entries(actions).reduce((acc, entry) => {
    const [name, func] = entry;
    return {
      ...acc,
      [name]: (...args) => func(dispatch, ...args)
    }
  }, {})
}
