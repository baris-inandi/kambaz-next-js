"use client";

import { KeyboardEvent, useState } from "react";
import { useParams } from "next/navigation";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { Module } from "../../../database";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  addModule,
  deleteModule,
  editModule,
  updateModule,
} from "../../../modules/reducer";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModuleEditor from "./ModuleEditor";
import ModulesControls from "./modulesControls";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useAppDispatch();
  const { modules } = useAppSelector((state) => state.modulesReducer);
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [showModuleEditor, setShowModuleEditor] = useState(false);
  const [newModuleName, setNewModuleName] = useState("");
  const [moduleNames, setModuleNames] = useState<Record<string, string>>({});
  const courseModules = modules.filter((module) => module.course === cid);
  const isFaculty = currentUser?.role === "FACULTY";

  const saveNewModule = () => {
    const trimmedName = newModuleName.trim();
    if (!trimmedName) {
      return;
    }

    dispatch(
      addModule({
        _id: uuidv4(),
        course: cid,
        name: trimmedName,
        lessons: [],
      }),
    );
    setNewModuleName("");
    setShowModuleEditor(false);
  };

  const startEditing = (module: Module) => {
    setModuleNames((current) => ({ ...current, [module._id]: module.name }));
    dispatch(editModule(module._id));
  };

  const saveModule = (module: Module) => {
    const nextName = (moduleNames[module._id] ?? module.name).trim();
    dispatch(
      updateModule({
        ...module,
        name: nextName || module.name,
      }),
    );
  };

  const deleteExistingModule = (moduleId: string) => {
    if (window.confirm("Delete this module?")) {
      dispatch(deleteModule(moduleId));
    }
  };

  const handleModuleNameKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    module: Module,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveModule(module);
    }
  };

  return (
    <div>
      <ModulesControls
        isFaculty={isFaculty}
        onAddModule={() => setShowModuleEditor(true)}
      />
      <ModuleEditor
        show={showModuleEditor}
        name={newModuleName}
        onNameChange={setNewModuleName}
        onCancel={() => {
          setShowModuleEditor(false);
          setNewModuleName("");
        }}
        onSave={saveNewModule}
      />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        {courseModules.map((module) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {module.editing && isFaculty ? (
                <FormControl
                  className="d-inline-block w-auto me-2"
                  value={moduleNames[module._id] ?? module.name}
                  onChange={(event) =>
                    setModuleNames((current) => ({
                      ...current,
                      [module._id]: event.target.value,
                    }))
                  }
                  onKeyDown={(event) => handleModuleNameKeyDown(event, module)}
                  onBlur={() => saveModule(module)}
                />
              ) : (
                <span>{module.name}</span>
              )}
              <ModuleControlButtons
                isFaculty={isFaculty}
                moduleId={module._id}
                onEditModule={() => startEditing(module)}
                onDeleteModule={deleteExistingModule}
              />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              {module.lessons.length > 0 ? (
                module.lessons.map((lesson) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                    <LessonControlButtons />
                  </ListGroupItem>
                ))
              ) : (
                <ListGroupItem className="wd-lesson p-3 ps-1 text-muted">
                  <BsGripVertical className="me-2 fs-3" /> No lessons yet
                </ListGroupItem>
              )}
            </ListGroup>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
