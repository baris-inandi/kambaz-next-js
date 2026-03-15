"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Assignment } from "../../../database";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { addAssignment, updateAssignment } from "../../../assignments/reducer";

interface Props {
  cid: string;
  initialAssignment?: Assignment;
  isNew?: boolean;
}

const createEmptyAssignment = (cid: string): Assignment => ({
  _id: uuidv4(),
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

  useEffect(() => {
    if (currentUser && currentUser.role !== "FACULTY") {
      router.replace(`/courses/${cid}/assignments`);
    }
  }, [cid, currentUser, router]);

  if (!currentUser || currentUser.role !== "FACULTY") {
    return null;
  }

  const updateField =
    (key: keyof Assignment) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const value =
        key === "points" ? Number(event.target.value || 0) : event.target.value;
      setAssignment({ ...assignment, [key]: value } as Assignment);
    };

  const save = () => {
    if (isNew) {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
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
          onChange={updateField("title")}
          className="mb-2"
        />

        <FormControl
          as="textarea"
          id="wd-description"
          rows={4}
          className="mb-3"
          value={assignment.description}
          onChange={updateField("description")}
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
              onChange={updateField("points")}
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
              onChange={updateField("assignmentGroup")}
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
              onChange={updateField("displayGradeAs")}
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
              onChange={updateField("submissionType")}
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
              onChange={updateField("assignTo")}
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
              onChange={updateField("dueDate")}
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
              onChange={updateField("availableFrom")}
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
              onChange={updateField("availableUntil")}
            />
          </Col>
        </Row>

        <div className="text-end">
          <Link
            href={`/courses/${cid}/assignments`}
            className="btn btn-secondary me-2"
          >
            Cancel
          </Link>
          <Button variant="danger" onClick={save} type="button">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
