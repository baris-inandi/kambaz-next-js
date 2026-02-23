import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";
import todos from "./todos.json";

export default function TodoList() {
  return (
    <div id="wd-todo-list">
      <h4>Todo List</h4>
      <ListGroup>
        {todos.map((todo) => (
          <TodoItem key={`${todo.title}-${todo.status}`} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
