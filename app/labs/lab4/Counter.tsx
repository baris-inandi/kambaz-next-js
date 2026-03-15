"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(7);

  return (
    <div id="wd-counter-use-state" className="mb-4">
      <h2>Counter</h2>
      <h3>{count}</h3>
      <button
        onClick={() => setCount(count + 1)}
        className="btn btn-success me-2"
      >
        Up
      </button>
      <button onClick={() => setCount(count - 1)} className="btn btn-danger">
        Down
      </button>
      <hr />
    </div>
  );
}
