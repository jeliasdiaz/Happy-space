import { useCallback, useState } from "react";

export const useCounter = (initialValue = 0) => {
  const [counter, setCounter] = useState(initialValue);

  const increment = useCallback((value = 1) => setCounter((c) => c + value), []);
  const decrement = useCallback(
    (value = 1) => setCounter((c) => (c === 0 ? 0 : c - value)),
    []
  );
  const reset = useCallback(() => setCounter(initialValue), [initialValue]);

  return {
    counter,
    increment,
    decrement,
    reset,
  };
};
