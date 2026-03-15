"use client";

import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { add } from "./addReducer";

export default function AddRedux() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  const { sum } = useSelector((state: RootState) => state.addReducer);
  const dispatch = useDispatch();

  return (
    <div className="w-25 mb-4" id="wd-add-redux">
      <h2>Add Redux</h2>
      <h3>
        {a} + {b} = {sum}
      </h3>
      <FormControl
        type="number"
        value={a}
        onChange={(e) => setA(Number(e.target.value))}
        className="mb-2"
      />
      <FormControl
        type="number"
        value={b}
        onChange={(e) => setB(Number(e.target.value))}
        className="mb-2"
      />
      <Button id="wd-add-redux-click" onClick={() => dispatch(add({ a, b }))}>
        Add Redux
      </Button>
      <hr />
    </div>
  );
}
