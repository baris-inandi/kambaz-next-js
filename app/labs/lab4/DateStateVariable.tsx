"use client";

import { useState } from "react";
import { FormControl } from "react-bootstrap";

export default function DateStateVariable() {
  const [today, setToday] = useState("2026-03-15");

  return (
    <div id="wd-date-state-variables" className="mb-4">
      <h2>Date State Variables</h2>
      <FormControl
        type="date"
        value={today}
        onChange={(e) => setToday(e.target.value)}
        className="mb-2 w-auto"
      />
      <div>today = {today}</div>
      <hr />
    </div>
  );
}
