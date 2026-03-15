"use client";

import { CounterProvider, useCounter } from "./context";

function CounterView() {
  const { count, increase, decrease } = useCounter();

  return (
    <div id="wd-context-counter" className="mb-4">
      <h3>Counter Context</h3>
      <h4>{count}</h4>
      <button onClick={() => increase(5)} className="btn btn-success me-2">
        Increase by 5
      </button>
      <button onClick={() => decrease(2)} className="btn btn-danger">
        Decrease by 2
      </button>
      <hr />
    </div>
  );
}

export default function CounterContextExample() {
  return (
    <CounterProvider>
      <CounterView />
    </CounterProvider>
  );
}
