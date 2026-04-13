"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { Module } from "../../../database";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  addModule,
  editModule,
  setModules,
  updateModule as updateModuleAction,
} from "../../../modules/reducer";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModuleEditor from "./ModuleEditor";
import ModulesControls from "./modulesControls";
import * as client from "../../client";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useAppDispatch();
  const { modules } = useAppSelector((state) => state.modulesReducer);
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [showModuleEditor, setShowModuleEditor] = useState(false);
  const [newModuleName, setNewModuleName] = useState("");
  const [moduleNames, setModuleNames] = useState<Record<string, string>>({});
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const fetchModules = async () => {
      if (!cid) {
        return;
      }
      const nextModules = await client.findModulesForCourse(cid);
      dispatch(setModules(nextModules));
    };

    fetchModules();
  }, [cid, dispatch]);

  const saveNewModule = async () => {
    const trimmedName = newModuleName.trim();
    if (!trimmedName) {
      return;
    }

    const newModule = await client.createModuleForCourse(cid, {
      course: cid,
      name: trimmedName,
      lessons: [],
    });
    dispatch(addModule(newModule));
    setNewModuleName("");
    setShowModuleEditor(false);
  };

  const startEditing = (module: Module) => {
    setModuleNames((current) => ({ ...current, [module._id]: module.name }));
    dispatch(editModule(module._id));
  };

  const saveModule = async (module: Module) => {
    const nextName = (moduleNames[module._id] ?? module.name).trim();
    const updatedModule = {
      ...module,
      name: nextName || module.name,
      editing: false,
    };
    await client.updateModule(cid, updatedModule);
    dispatch(
      setModules(
        modules.map((listedModule) =>
          listedModule._id === updatedModule._id
            ? updatedModule
            : { ...listedModule, editing: false },
        ),
      ),
    );
  };

  const deleteExistingModule = async (moduleId: string) => {
    if (window.confirm("Delete this module?")) {
      await client.deleteModule(cid, moduleId);
      dispatch(setModules(modules.filter((module) => module._id !== moduleId)));
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
        {modules.map((module) => (
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
                  onChange={(event) => {
                    const nextName = event.target.value;
                    setModuleNames((current) => ({
                      ...current,
                      [module._id]: nextName,
                    }));
                    dispatch(
                      updateModuleAction({
                        ...module,
                        name: nextName,
                      }),
                    );
                  }}
                  onKeyDown={(event) => handleModuleNameKeyDown(event, module)}
                  onBlur={() => void saveModule(module)}
                />
              ) : (
                <span>{module.name}</span>
              )}
              <ModuleControlButtons
                isFaculty={isFaculty}
                moduleId={module._id}
                onEditModule={() => startEditing(module)}
                onDeleteModule={(moduleId) =>
                  void deleteExistingModule(moduleId)
                }
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
