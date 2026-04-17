"use client";

import { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary mb-2" href={API}>
        Get Todos
      </a>
      <hr />

      <h4>Retrieving an Item from an Array by ID</h4>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>
      <FormControl
        id="wd-todo-id"
        defaultValue={todo.id}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h4>Filtering Array Items</h4>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary mb-2"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />

      <h4>Creating New Items in an Array</h4>
      <a
        id="wd-create-todo-link"
        className="btn btn-success mb-2"
        href={`${API}/create`}
      >
        Create Todo
      </a>
      <hr />

      <h4>Removing from an Array</h4>
      <a
        id="wd-remove-todo"
        className="btn btn-danger float-end"
        href={`${API}/${todo.id}/delete`}
      >
        Remove Todo with ID = {todo.id}
      </a>
      <FormControl
        defaultValue={todo.id}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h4>Updating an Item in an Array</h4>
      <a
        id="wd-update-todo-title"
        href={`${API}/${todo.id}/title/${encodeURIComponent(todo.title)}`}
        className="btn btn-primary float-end"
      >
        Update Todo
      </a>
      <FormControl
        defaultValue={todo.id}
        className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <FormControl
        defaultValue={todo.title}
        className="w-50 float-start"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br />
      <br />
      <hr />

      <h4>Updating Description and Completed</h4>
      <a
        id="wd-update-todo-description"
        className="btn btn-outline-primary me-2 mb-2"
        href={`${API}/${todo.id}/description/${encodeURIComponent(todo.description)}`}
      >
        Update Description
      </a>
      <FormControl
        defaultValue={todo.description}
        className="mb-2"
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <FormCheck
        id="wd-completed"
        className="mb-2"
        label="Completed"
        checked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
      />
      <a
        id="wd-update-todo-completed"
        className="btn btn-outline-success"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Complete Todo ID = {todo.id}
      </a>
      <hr />
    </div>
  );
}
