"use client";

import Link from "next/link";
import CounterContextExample from "./counter";
import ReactContextTodoList from "./todos/ReactContextTodoList";

export default function ReactContextPage() {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>React Context Examples</h2>
        <Link href="/labs/lab4" className="btn btn-outline-secondary">
          Back to Lab 4
        </Link>
      </div>
      <CounterContextExample />
      <ReactContextTodoList />
    </div>
  );
}
