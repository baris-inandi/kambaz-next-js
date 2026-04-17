"use client";

import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import useTodoStore from "./useTodoStore";

export default function ZustandTodoList() {
  const { todos, todo, setTodo, addTodo, updateTodo, deleteTodo } =
    useTodoStore((state) => state);

  return (
    <div id="wd-zustand-todos" className="mb-4">
      <h3>Zustand Todo List</h3>
      <ListGroup>
        <ListGroupItem>
          <Button onClick={addTodo} className="me-2">
            Add
          </Button>
          <Button onClick={updateTodo} variant="warning" className="me-2">
            Update
          </Button>
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </ListGroupItem>
        {todos.map((item) => (
          <ListGroupItem
            key={item.id}
            className="d-flex align-items-center gap-2"
          >
            <Button
              size="sm"
              variant="danger"
              onClick={() => deleteTodo(item.id)}
            >
              Delete
            </Button>
            <Button size="sm" variant="warning" onClick={() => setTodo(item)}>
              Edit
            </Button>
            <span>{item.title}</span>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
