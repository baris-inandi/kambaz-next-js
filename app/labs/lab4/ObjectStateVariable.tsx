"use client";

import { useState } from "react";
import { FormControl } from "react-bootstrap";

export default function ObjectStateVariable() {
  const [person, setPerson] = useState({ name: "Jose", age: 34 });

  return (
    <div id="wd-object-state-variable" className="mb-4">
      <h2>Object State Variable</h2>
      <FormControl
        value={person.name}
        onChange={(e) => setPerson({ ...person, name: e.target.value })}
        className="mb-2"
      />
      <FormControl
        type="number"
        value={person.age}
        onChange={(e) => setPerson({ ...person, age: Number(e.target.value) })}
        className="mb-2"
      />
      <pre>{JSON.stringify(person, null, 2)}</pre>
      <hr />
    </div>
  );
}
