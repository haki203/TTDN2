/* eslint-disable prettier/prettier */

import React, {useState, useContext, useEffect, createContext} from 'react';

const CounterContext = createContext(0);

export default CounterContext; // Sử dụng default export

export const Provider = ({children}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
    }, 1000);
  }, [count]);
  
  return (
    <CounterContext.Provider value={count}>{children}</CounterContext.Provider>
  );
};

export const useCounter = () => useContext(CounterContext);
