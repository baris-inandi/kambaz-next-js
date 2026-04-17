"use client";

import { useState } from "react";
import { FormControl } from "react-bootstrap";

export default function StringStateVariables() {
  const [firstName, setFirstName] = useState("Alice");
  const [lastName, setLastName] = useState("Wonderland");

  return (
    <div id="wd-string-state-variables" className="mb-4">
      <h2>String State Variables</h2>
      <FormControl
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="mb-2"
      />
      <FormControl
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="mb-2"
      />
      <div>
        firstName = {firstName}, lastName = {lastName}
      </div>
      <hr />
    </div>
  );
}
