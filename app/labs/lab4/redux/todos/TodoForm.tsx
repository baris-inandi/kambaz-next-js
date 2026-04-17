"use client";

import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addTodo, setTodo, updateTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem>
      <Button
        onClick={() => dispatch(addTodo())}
        id="wd-add-todo-click"
        className="me-2"
      >
        Add
      </Button>
      <Button
        onClick={() => dispatch(updateTodo())}
        id="wd-update-todo-click"
        className="me-2"
        variant="warning"
      >
        Update
      </Button>
      <FormControl
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
    </ListGroupItem>
  );
}
