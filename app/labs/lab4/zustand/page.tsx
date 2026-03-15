"use client";

import Link from "next/link";
import ZustandCounter from "./counter";
import ZustandTodoList from "./todos/ZustandTodoList";

export default function ZustandPage() {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Zustand Examples</h2>
        <Link href="/labs/lab4" className="btn btn-outline-secondary">
          Back to Lab 4
        </Link>
      </div>
      <ZustandCounter />
      <ZustandTodoList />
    </div>
  );
}
