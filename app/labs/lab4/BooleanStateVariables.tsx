"use client";

import { useState } from "react";

export default function BooleanStateVariables() {
  const [isTrue, setIsTrue] = useState(true);
  const [isFalse, setIsFalse] = useState(false);

  return (
    <div id="wd-boolean-state-variables" className="mb-4">
      <h2>Boolean State Variables</h2>
      <div>
        <input
          id="wd-toggle-true"
          type="checkbox"
          checked={isTrue}
          onChange={(e) => setIsTrue(e.target.checked)}
          className="me-2"
        />
        isTrue = {`${isTrue}`}
      </div>
      <div>
        <input
          id="wd-toggle-false"
          type="checkbox"
          checked={isFalse}
          onChange={(e) => setIsFalse(e.target.checked)}
          className="me-2"
        />
        isFalse = {`${isFalse}`}
      </div>
      <hr />
    </div>
  );
}
