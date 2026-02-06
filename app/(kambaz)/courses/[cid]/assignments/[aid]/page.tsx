import {
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container">
      <Form>
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl
          id="wd-name"
          defaultValue="A1 - ENV + HTML"
          className="mb-2"
        />

        <FormControl
          as="textarea"
          id="wd-description"
          rows={4}
          className="mb-3"
          defaultValue="The assignment is available online. Submit a link to the landing page."
        />

        <Row className="mb-3">
          <Col sm={3} className="text-end">
            <FormLabel htmlFor="wd-points">Points</FormLabel>
          </Col>
          <Col sm={9}>
            <FormControl type="number" id="wd-points" defaultValue={100} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3} className="text-end">
            <FormLabel htmlFor="wd-assignment-group">
              Assignment Group
            </FormLabel>
          </Col>
          <Col sm={9}>
            <FormSelect id="wd-assignment-group" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3} className="text-end">
            <FormLabel htmlFor="wd-display-grade-as">
              Display Grade as
            </FormLabel>
          </Col>
          <Col sm={9}>
            <FormSelect id="wd-display-grade-as" defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
              <option value="Letter">Letter</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3} className="text-end">
            <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
          </Col>
          <Col sm={9}>
            <FormSelect id="wd-submission-type" defaultValue="Online">
              <option value="Online">Online</option>
              <option value="Text Entry">Text Entry</option>
              <option value="Media Recording">Media Recording</option>
              <option value="File Upload">File Upload</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3} className="text-end">
            <FormLabel htmlFor="wd-assign-to">Assign to</FormLabel>
          </Col>
          <Col sm={9}>
            <FormControl defaultValue="Everyone" id="wd-assign-to" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3} className="text-end">
            <FormLabel htmlFor="wd-due-date">Due</FormLabel>
          </Col>
          <Col sm={9}>
            <FormControl
              type="date"
              id="wd-due-date"
              defaultValue="2024-12-31"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3} className="text-end">
            <FormLabel htmlFor="wd-available-from">Available from</FormLabel>
          </Col>
          <Col sm={9}>
            <FormControl
              type="date"
              id="wd-available-from"
              defaultValue="2024-01-01"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3} className="text-end">
            <FormLabel htmlFor="wd-available-until">Until</FormLabel>
          </Col>
          <Col sm={9}>
            <FormControl
              type="date"
              id="wd-available-until"
              defaultValue="2024-12-31"
            />
          </Col>
        </Row>

        <div className="text-end">
          <Button variant="secondary" className="me-2">
            Cancel
          </Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}
