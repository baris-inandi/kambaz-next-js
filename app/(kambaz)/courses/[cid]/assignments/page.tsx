import Link from "next/link";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

interface Props {
  params: Promise<{ cid: string }>;
}

const assignments = [
  {
    id: "123",
    title: "A1 - ENV + HTML",
    subtext:
      "Multiple Modules | Not available until May 6 at 12:00am | Due May 13 at 11:59pm | 100 pts",
  },
  {
    id: "124",
    title: "A2 - CSS",
    subtext:
      "Multiple Modules | Not available until May 13 at 12:00am | Due May 20 at 11:59pm | 100 pts",
  },
  {
    id: "125",
    title: "A3 - JAVASCRIPT",
    subtext:
      "Multiple Modules | Not available until May 20 at 12:00am | Due May 27 at 11:59pm | 100 pts",
  },
  {
    id: "126",
    title: "A4 - REDUX",
    subtext:
      "Multiple Modules | Not available until May 27 at 12:00am | Due Jun 3 at 11:59pm | 100 pts",
  },
];

export default async function Assignments(props: Props) {
  const { cid } = await props.params;

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
        {assignments.map((assignment) => (
          <ListGroupItem
            key={assignment.id}
            className="wd-assignment-list-item"
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Link
                  href={`/courses/${cid}/assignments/${assignment.id}`}
                  className="wd-assignment-link text-decoration-none"
                >
                  {assignment.title}
                </Link>
                <div className="small text-muted">{assignment.subtext}</div>
              </div>
              <IoEllipsisVertical className="fs-4" />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
