"use client";

import useCounterStore from "./store";

export default function ZustandCounter() {
  const { count, increase, decrease } = useCounterStore((state) => state);

  return (
    <div id="wd-zustand-counter" className="mb-4">
      <h3>Zustand Counter</h3>
      <h4>{count}</h4>
      <button onClick={() => increase(10)} className="btn btn-success me-2">
        Increase by 10
      </button>
      <button onClick={() => decrease(4)} className="btn btn-danger">
        Decrease by 4
      </button>
      <hr />
    </div>
  );
}
