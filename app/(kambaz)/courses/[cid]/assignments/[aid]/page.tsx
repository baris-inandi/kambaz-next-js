import Link from "next/link";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { notFound } from "next/navigation";
import * as db from "../../../../database";

interface Props {
  params: Promise<{ cid: string; aid: string }>;
}

export default async function AssignmentEditor(props: Props) {
  const { cid, aid } = await props.params;
  const assignment = db.assignments.find(
    (item) => item._id === aid && item.course === cid,
  );

  if (!assignment) {
    notFound();
  }

  return (
    <div id="wd-assignments-editor" className="container">
      <Form>
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl
          id="wd-name"
          defaultValue={assignment.title}
          className="mb-2"
        />

        <FormControl
          as="textarea"
          id="wd-description"
          rows={4}
          className="mb-3"
          defaultValue={assignment.description}
        />

        <Row className="mb-3">
          <Col sm={3} className="text-start">
            <FormLabel htmlFor="wd-points">Points</FormLabel>
          </Col>
          <Col sm={9}>
            <FormControl
              type="number"
              id="wd-points"
              defaultValue={assignment.points}
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
              defaultValue={assignment.assignmentGroup}
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
              defaultValue={assignment.displayGradeAs}
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
              defaultValue={assignment.submissionType}
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
            <FormControl defaultValue={assignment.assignTo} id="wd-assign-to" />
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
              defaultValue={assignment.dueDate}
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
              defaultValue={assignment.availableFrom}
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
              defaultValue={assignment.availableUntil}
            />
          </Col>
        </Row>

        <div className="text-end">
          <Button
            as={Link}
            href={`/courses/${cid}/assignments`}
            variant="secondary"
            className="me-2"
          >
            Cancel
          </Button>
          <Button
            as={Link}
            href={`/courses/${cid}/assignments`}
            variant="danger"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
