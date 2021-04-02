import React, { useContext } from 'react';

export const useCreateUseContext = (
  StateContext,
  DispatchContext
) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return [state, dispatch];
}
