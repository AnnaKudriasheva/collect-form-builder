import React, { useReducer, createContext } from 'react';
export const FormStylesContext = createContext();

const initialState = {
  wrapper: {
    "box-shadow": '0px 0px 3px rgba(23, 31, 39, 0.3)',
    "border": '1px solid transparent',
    "height": '2.5rem',
    "padding": '.375rem .75rem',
    "border-radius": '.25rem',
    "margin-bottom": '1rem',
    "width": '100%',
  },
  iframe: {
    "font-size": "16px",
    "color": "#40545F",
    "&::placeholder": {
      "color": "#C8D0DB"
    },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_IFRAME_STYLES":
      return {
        ...state,
        iframe: action.payload
      };
    case "UPDATE_WRAPPER_STYLES":
      return {
        ...state,
        wrapper: action.payload
      };
    default:
      return state;
  }
};

export const FormStylesContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FormStylesContext.Provider value={[state, dispatch]}>
      {props.children}
    </FormStylesContext.Provider>
  );
};