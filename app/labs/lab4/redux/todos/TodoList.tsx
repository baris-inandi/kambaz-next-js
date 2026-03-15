"use client";

import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);

  return (
    <div id="wd-redux-todo-list" className="mb-4">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
