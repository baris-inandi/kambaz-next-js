"use client";

import { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [title, setTitle] = useState("NodeJS Assignment");
  const [score, setScore] = useState("100");
  const [completed, setCompleted] = useState(false);

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignment"
        className="btn btn-primary me-2 mb-2"
        href={`${HTTP_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-outline-primary mb-2"
        href={`${HTTP_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <a
        id="wd-retrieve-module"
        className="btn btn-success me-2 mb-2"
        href={`${HTTP_SERVER}/lab5/module`}
      >
        Get Module
      </a>
      <a
        id="wd-retrieve-module-name"
        className="btn btn-outline-success mb-2"
        href={`${HTTP_SERVER}/lab5/module/name`}
      >
        Get Module Name
      </a>
      <hr />

      <h4>Updating Object Properties</h4>
      <FormControl
        className="mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <a
        id="wd-update-assignment-title"
        className="btn btn-warning me-2 mb-2"
        href={`${HTTP_SERVER}/lab5/assignment/title/${encodeURIComponent(title)}`}
      >
        Update Title
      </a>
      <FormControl
        className="mb-2"
        type="number"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />
      <a
        id="wd-update-assignment-score"
        className="btn btn-info me-2 mb-2"
        href={`${HTTP_SERVER}/lab5/assignment/score/${score}`}
      >
        Update Score
      </a>
      <FormCheck
        id="wd-update-assignment-completed"
        className="mb-2"
        label="Completed"
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <a
        id="wd-update-assignment-completed-link"
        className="btn btn-success mb-2"
        href={`${HTTP_SERVER}/lab5/assignment/completed/${completed}`}
      >
        Update Completed
      </a>
      <hr />
    </div>
  );
}
