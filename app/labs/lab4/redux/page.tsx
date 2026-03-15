"use client";

import Link from "next/link";
import AddRedux from "./AddRedux";
import CounterRedux from "./CounterRedux";
import HelloRedux from "./hello";
import TodoList from "./todos/TodoList";

export default function ReduxExamples() {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Redux Examples</h2>
        <Link href="/labs/lab4" className="btn btn-outline-secondary">
          Back to Lab 4
        </Link>
      </div>
      <HelloRedux />
      <CounterRedux />
      <AddRedux />
      <TodoList />
    </div>
  );
}
