import { createContext, useState } from "react";

export let CounterContext = createContext(0);

export default function CounterContextProvider(props) {
  const [count, setCount] = useState(0);

  function changeCount() {
    setCount(Math.round(Math.random() * 100));
  }

  return (
    <CounterContext.Provider value={{ count, setCount, changeCount }}>
      {props.children}
    </CounterContext.Provider>
  );
}
