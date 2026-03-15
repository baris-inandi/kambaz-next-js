"use client";

import { useState } from "react";
import ChildStateComponent from "./ChildStateComponent";

export default function ParentStateComponent() {
  const [counter, setCounter] = useState(10);

  return (
    <div id="wd-parent-state" className="mb-4">
      <h2>Sharing State Between Components</h2>
      <div className="mb-2">Parent Counter = {counter}</div>
      <ChildStateComponent counter={counter} setCounter={setCounter} />
      <hr />
    </div>
  );
}
