"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import * as client from "./client";
import { Todo } from "./client";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    client.fetchTodos().then((nextTodos) => {
      setTodos(nextTodos);
    });
  }, []);

  const removeTodo = async (todo: Todo) => {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(updatedTodos);
  };

  const createNewTodo = async () => {
    const updatedTodos = await client.createNewTodo();
    setTodos(updatedTodos);
  };

  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      description: "Created with HTTP POST",
      completed: false,
    });
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (todo: Todo) => {
    await client.deleteTodo(todo);
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  const editTodo = (todo: Todo) => {
    setTodos(
      todos.map((t) =>
        t.id === todo.id
          ? { ...todo, editing: true }
          : { ...t, editing: false },
      ),
    );
  };

  const updateTodo = async (todo: Todo) => {
    await client.updateTodo(todo);
    setTodos(
      todos.map((t) => (t.id === todo.id ? { ...todo, editing: false } : t)),
    );
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>, todo: Todo) => {
    if (event.key === "Enter") {
      void updateTodo(todo);
    }
  };

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      <h4>
        Todos
        <FaPlusCircle
          onClick={() => void createNewTodo()}
          className="text-success float-end fs-3"
          id="wd-create-todo"
        />
        <FaPlusCircle
          onClick={() => void postNewTodo()}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
        />
      </h4>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            <FaTrash
              onClick={() => void removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
            />
            <TiDelete
              onClick={() => void deleteTodo(todo)}
              className="text-danger float-end me-2 fs-3"
              id="wd-delete-todo"
            />
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary float-end me-2 mt-1"
              id={`wd-edit-todo-${todo.id}`}
            />
            <input
              type="checkbox"
              defaultChecked={todo.completed}
              className="form-check-input me-2 float-start"
              onChange={(e) =>
                void updateTodo({ ...todo, completed: e.target.checked })
              }
            />
            {!todo.editing ? (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            ) : (
              <FormControl
                className="w-50 float-start"
                defaultValue={todo.title}
                onKeyDown={(e) => onKeyDown(e, todo)}
                onChange={(e) =>
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, title: e.target.value } : t,
                    ),
                  )
                }
              />
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
