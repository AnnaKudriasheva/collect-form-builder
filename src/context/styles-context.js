import React, { useReducer, createContext } from 'react';
export const FormStylesContext = createContext();

const initialState = {
  wrapper: {
    'margin-bottom': '16px',
    'width': '100%',
    'height': '40px',
    'padding-top': '6px',
    'padding-right': '12px',
    'padding-bottom': '6px',
    'padding-left': '12px',
    'box-shadow': '0px 0px 3px rgba(23, 31, 39, 0.3)',
    'border-width': '1px',
    'border-color': 'transparent',
    'border-style': 'solid',
    'border-radius': '4px',
  },
  iframe: {
    'font-size': '16px',
    'color': '#40545F',
    '&::placeholder': {
      'color': '#C8D0DB'
    },
  },
  state: {
    focused: {
      'border-color': '#145FF5',
      'box-shadow': '0px 0px 6px rgb(87 158 255 / 40%)'
    },
    active: {

    },
    empty: {

    },
    touched: {

    },
    valid: {

    },
    invalid: {
      'border-color': '#FF0000',
      'box-shadow': '0px 0px 6px rgb(255 0 0 / 40%)'
    },
    dirty: {
      
    }
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_IFRAME_STYLES':
      return {
        ...state,
        iframe: action.payload
      };
    case 'UPDATE_WRAPPER_STYLES':
      return {
        ...state,
        wrapper: action.payload
      };
    case 'UPDATE_STATE_STYLES':
      return {
        ...state,
        state: action.payload
      }
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