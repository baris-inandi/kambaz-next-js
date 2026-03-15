"use client";

import { Button, FormControl, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  title?: string;
  name: string;
  onNameChange: (name: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function ModuleEditor({
  show,
  title = "Add Module",
  name,
  onNameChange,
  onCancel,
  onSave,
}: Props) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          id="wd-module-name"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Module Name"
          autoFocus
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
