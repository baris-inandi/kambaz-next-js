"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface CounterContextValue {
  count: number;
  increase: (by: number) => void;
  decrease: (by: number) => void;
}

const CounterContext = createContext<CounterContextValue | null>(null);

export function CounterProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const value = useMemo(
    () => ({
      count,
      increase: (by: number) => setCount((current) => current + by),
      decrease: (by: number) => setCount((current) => current - by),
    }),
    [count],
  );

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

export function useCounter() {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error("useCounter must be used within CounterProvider");
  }

  return context;
}
