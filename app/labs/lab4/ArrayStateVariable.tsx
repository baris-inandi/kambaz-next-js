"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { RootState } from "./store";

export default function ArrayStateVariable() {
  const [elements, setElements] = useState<number[]>([1, 2, 3]);
  const [newElement, setNewElement] = useState(4);
  const { todos } = useSelector((state: RootState) => state.todosReducer);

  const addElement = () => {
    setElements([...elements, newElement]);
    setNewElement(newElement + 1);
  };

  const deleteElement = (value: number) => {
    setElements(elements.filter((element) => element !== value));
  };

  return (
    <div id="wd-array-state-variables" className="mb-4">
      <h2>Array State Variables</h2>
      <div className="d-flex gap-2 w-50 mb-2">
        <FormControl
          type="number"
          value={newElement}
          onChange={(e) => setNewElement(Number(e.target.value))}
        />
        <Button onClick={addElement}>Add Element</Button>
      </div>
      <ListGroup className="mb-2">
        {elements.map((element) => (
          <ListGroupItem
            key={element}
            className="d-flex justify-content-between align-items-center"
          >
            {element}
            <Button
              size="sm"
              variant="danger"
              onClick={() => deleteElement(element)}
            >
              Delete
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
      <h3>Todos from Redux</h3>
      <ListGroup className="mb-2">
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
