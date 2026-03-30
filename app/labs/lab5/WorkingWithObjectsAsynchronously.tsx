"use client";

import { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";
import * as client from "./client";
import { LabAssignment } from "./client";

const emptyAssignment: LabAssignment = {
  title: "",
  description: "",
  due: "",
  completed: false,
  score: 0,
};

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<LabAssignment>(emptyAssignment);

  const fetchAssignment = async () => {
    const nextAssignment = await client.fetchAssignment();
    setAssignment(nextAssignment);
  };

  const updateTitle = async () => {
    const updatedAssignment = await client.updateTitle(assignment.title);
    setAssignment(updatedAssignment);
  };

  const updateScore = async () => {
    const updatedAssignment = await client.updateScore(assignment.score);
    setAssignment(updatedAssignment);
  };

  const updateCompleted = async (completed: boolean) => {
    const updatedAssignment = await client.updateCompleted(completed);
    setAssignment(updatedAssignment);
  };

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>
      <button className="btn btn-primary me-2 mb-2" onClick={fetchAssignment}>
        Fetch Assignment
      </button>
      <button
        className="btn btn-outline-primary mb-2"
        onClick={async () => {
          const title = await client.fetchAssignmentTitle();
          setAssignment((current) => ({ ...current, title }));
        }}
      >
        Fetch Title
      </button>
      <FormControl
        className="mb-2"
        value={assignment.title}
        onChange={(e) =>
          setAssignment((current) => ({ ...current, title: e.target.value }))
        }
        placeholder="Assignment title"
      />
      <button className="btn btn-warning me-2 mb-2" onClick={updateTitle}>
        Update Title
      </button>
      <FormControl
        className="mb-2"
        type="number"
        value={assignment.score}
        onChange={(e) =>
          setAssignment((current) => ({
            ...current,
            score: Number(e.target.value || 0),
          }))
        }
        placeholder="Score"
      />
      <button className="btn btn-info me-2 mb-2" onClick={updateScore}>
        Update Score
      </button>
      <FormCheck
        id="wd-assignment-completed-checkbox"
        className="mb-2"
        label="Completed"
        checked={assignment.completed}
        onChange={(e) => {
          const completed = e.target.checked;
          setAssignment((current) => ({ ...current, completed }));
          void updateCompleted(completed);
        }}
      />
      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
