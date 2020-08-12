import React, { createContext, useContext, useReducer, useEffect, useMemo } from "react";
import data from "./MOCK_DATA.json";

export const DataContext = createContext();

function dataReducer(state, action) {
  switch (action.type) {
    case 'START':
      return {
        loading: true,
        events: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        events: action.payload,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        events: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function DataProvider(props) {
  const [context, dispatch] = useReducer(dataReducer, {
    loading: false,
    events: null,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: 'START' });
    // If want to access data from API please enable fetch related code.

    // // Data is generated from https://www.mockaroo.com/ and stored into my bttvs.com domain per access.
    // fetch('https://bttvs.com/data/events.json')
    //   .then(response => response.json())
    //   .then(data => {
    //     dispatch({ type: 'SUCCESS', payload: data });
    //   })
    //   .catch(e => dispatch({ type: 'ERROR', payload: e }));

    // I am manually adding data from localsource. if accessing through api, commentout following line
    dispatch({ type: 'SUCCESS', payload: data });
  }, []);
  return <DataContext.Provider value={context} {...props} />;
}

export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error(
      'useData() requires a DataProvider component as its ancestor',
    );
  }
  const enhancedContext = useMemo(
    () => ({
      ...context,
      findEventById: id => {
        if (context.events) {
          return context.events.find(
            event => event.id === id,
          );
        } else {
          return null;
        }
      },
    }),
    [context],
  );
  return enhancedContext;
}