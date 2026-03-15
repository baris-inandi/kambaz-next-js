"use client";

import Link from "next/link";
import CounterContext from "./counter";
import { CounterProvider } from "./counter/context";
import ReactContextTodoList from "./todos/ReactContextTodoList";

export default function ReactContextPage() {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>React Context Examples</h1>
        <Link href="/labs/lab4" className="btn btn-outline-secondary">
          Back to Lab 4
        </Link>
      </div>
      <CounterProvider>
        <CounterContext />
      </CounterProvider>
      <ReactContextTodoList />
    </div>
  );
}
