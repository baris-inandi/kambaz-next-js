"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { Assignment } from "../../../database";
import { addAssignment, updateAssignment } from "../../../assignments/reducer";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import * as client from "../../../assignments/client";

interface Props {
  cid: string;
  initialAssignment?: Assignment;
  isNew?: boolean;
}

const createEmptyAssignment = (cid: string): Assignment => ({
  _id: "new",
  course: cid,
  title: "",
  description: "",
  points: 100,
  assignmentGroup: "ASSIGNMENTS",
  displayGradeAs: "Percentage",
  submissionType: "Online",
  assignTo: "Everyone",
  availableFrom: "2024-05-06",
  dueDate: "2024-05-13",
  availableUntil: "2024-05-14",
});

export default function AssignmentEditorForm({
  cid,
  initialAssignment,
  isNew = false,
}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [assignment, setAssignment] = useState<Assignment>(
    initialAssignment ?? createEmptyAssignment(cid),
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser && currentUser.role !== "FACULTY") {
      router.replace(`/courses/${cid}/assignments`);
    }
  }, [cid, currentUser, router]);

  if (!currentUser || currentUser.role !== "FACULTY") {
    return null;
  }

  const setAssignmentField = (
    key: keyof Assignment,
    value: string | number,
  ) => {
    setError("");
    setAssignment({ ...assignment, [key]: value } as Assignment);
  };

  const save = async () => {
    if (!assignment.title.trim()) {
      setError("Assignment title is required.");
      return;
    }

    if (isNew) {
      const createdAssignment = await client.createAssignmentForCourse(cid, {
        ...assignment,
        title: assignment.title.trim(),
        course: cid,
      });
      dispatch(addAssignment(createdAssignment));
    } else {
      const updatedAssignment = await client.updateAssignment({
        ...assignment,
        title: assignment.title.trim(),
        course: cid,
      });
      dispatch(updateAssignment(updatedAssignment));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container">
      <Form>
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl
          id="wd-name"
          value={assignment.title}
          onChange={(event) =>
            setAssignmentField("title", event.currentTarget.value)
          }
          className="mb-2"
        />

        <FormControl
          as="textarea"
          id="wd-description"
          rows={4}
          className="mb-3"
          value={assignment.description}
          onChange={(event) =>
            setAssignmentField("description", event.currentTarget.value)
          }
        />

        <Row className="mb-3">
          <Col sm={3} className="text-start">
            <FormLabel htmlFor="wd-points">Points</FormLabel>
          </Col>
          <Col sm={9}>
            <FormControl
              type="number"
              id="wd-points"
              value={assignment.points}
              onChange={(event) =>
                setAssignmentField(
                  "points",
                  Number(event.currentTarget.value || 0),
                )
              }
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3} className="text-start">
            <FormLabel htmlFor="wd-assignment-group">
              Assignment Group
            </FormLabel>
          </Col>
          <Col sm={9}>
            <FormSelect
              id="wd-assignment-group"
              value={assignment.assignmentGroup}
              onChange={(event) =>
                setAssignmentField("assignmentGroup", event.currentTarget.value)
              }
            >
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3} className="text-start">
            <FormLabel htmlFor="wd-display-grade-as">
              Display Grade as
            </FormLabel>
          </Col>
          <Col sm={9}>
            <FormSelect
              id="wd-display-grade-as"
              value={assignment.displayGradeAs}
              onChange={(event) =>
                setAssignmentField("displayGradeAs", event.currentTarget.value)
              }
            >
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
              <option value="Letter">Letter</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3} className="text-start">
            <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
          </Col>
          <Col sm={9}>
            <FormSelect
              id="wd-submission-type"
              value={assignment.submissionType}
              onChange={(event) =>
                setAssignmentField("submissionType", event.currentTarget.value)
              }
            >
              <option value="Online">Online</option>
              <option value="Text Entry">Text Entry</option>
              <option value="Media Recording">Media Recording</option>
              <option value="File Upload">File Upload</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3} className="text-start">
            <FormLabel htmlFor="wd-assign-to">Assign to</FormLabel>
          </Col>
          <Col sm={9}>
            <FormControl
              value={assignment.assignTo}
              id="wd-assign-to"
              onChange={(event) =>
                setAssignmentField("assignTo", event.currentTarget.value)
              }
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3} className="text-start">
            <FormLabel htmlFor="wd-due-date">Due</FormLabel>
          </Col>
          <Col sm={9}>
            <FormControl
              type="date"
              id="wd-due-date"
              value={assignment.dueDate}
              onChange={(event) =>
                setAssignmentField("dueDate", event.currentTarget.value)
              }
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3} className="text-start">
            <FormLabel htmlFor="wd-available-from">Available from</FormLabel>
          </Col>
          <Col sm={9}>
            <FormControl
              type="date"
              id="wd-available-from"
              value={assignment.availableFrom}
              onChange={(event) =>
                setAssignmentField("availableFrom", event.currentTarget.value)
              }
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3} className="text-start">
            <FormLabel htmlFor="wd-available-until">Until</FormLabel>
          </Col>
          <Col sm={9}>
            <FormControl
              type="date"
              id="wd-available-until"
              value={assignment.availableUntil}
              onChange={(event) =>
                setAssignmentField("availableUntil", event.currentTarget.value)
              }
            />
          </Col>
        </Row>

        <div className="text-end">
          {error && <div className="text-danger small mb-2">{error}</div>}
          <Link
            href={`/courses/${cid}/assignments`}
            className="btn btn-secondary me-2"
          >
            Cancel
          </Link>
          <Button
            variant="danger"
            onClick={() => void save()}
            type="button"
            disabled={!assignment.title.trim()}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
