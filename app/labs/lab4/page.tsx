"use client";

import Link from "next/link";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import TodoList from "./redux/todos/TodoList";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <div id="wd-lab4" className="container">
      <h2>Lab 4</h2>
      <div className="mb-4">
        <Link href="/labs/lab4/redux" className="btn btn-outline-primary me-2">
          Redux Examples
        </Link>
        <Link
          href="/labs/lab4/react-context"
          className="btn btn-outline-secondary me-2"
        >
          React Context Examples
        </Link>
        <Link
          href="/labs/lab4/zustand"
          className="btn btn-outline-success me-2"
        >
          Zustand Examples
        </Link>
        <Link
          href="/labs/lab4/query-parameters"
          className="btn btn-outline-dark me-2"
        >
          URL Encoding
        </Link>
      </div>

      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />
      <TodoList />
    </div>
  );
}
