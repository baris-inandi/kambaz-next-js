import Link from "next/link";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import * as db from "../../../database";

interface Props {
  params: Promise<{ cid: string }>;
}

function formatDate(dateString: string) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default async function Assignments(props: Props) {
  const { cid } = await props.params;
  const courseAssignments = db.assignments.filter(
    (assignment) => assignment.course === cid,
  );

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="position-relative w-50">
          <FaSearch className="position-absolute top-50 translate-middle-y ms-2 text-secondary" />
          <FormControl
            placeholder="Search for Assignment"
            id="wd-search-assignment"
            className="ps-5"
          />
        </div>
        <div>
          <Button
            id="wd-add-assignment-group"
            variant="secondary"
            className="me-2"
          >
            <FaPlus className="me-1" /> Group
          </Button>
          <Button id="wd-add-assignment" variant="danger">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      <h3 id="wd-assignments-title" className="border p-3 bg-light">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>

      <ListGroup id="wd-assignment-list" className="rounded-0">
        {courseAssignments.map((assignment) => (
          <ListGroupItem
            key={assignment._id}
            className="wd-assignment-list-item"
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Link
                  href={`/courses/${cid}/assignments/${assignment._id}`}
                  className="wd-assignment-link text-decoration-none"
                >
                  {assignment.title}
                </Link>
                <div className="small text-muted">
                  Multiple Modules | Not available until{" "}
                  {formatDate(assignment.availableFrom)} at 12:00am | Due{" "}
                  {formatDate(assignment.dueDate)} at 11:59pm |{" "}
                  {assignment.points} pts
                </div>
              </div>
              <IoEllipsisVertical className="fs-4" />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
