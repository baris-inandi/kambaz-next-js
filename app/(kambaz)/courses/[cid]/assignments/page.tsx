"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { deleteAssignment, setAssignments } from "../../../assignments/reducer";
import * as client from "../../../assignments/client";

function formatDate(dateString: string) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useAppDispatch();
  const { assignments } = useAppSelector((state) => state.assignmentsReducer);
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!cid) {
        return;
      }
      const courseAssignments = await client.findAssignmentsForCourse(cid);
      dispatch(setAssignments(courseAssignments));
    };

    fetchAssignments();
  }, [cid, dispatch]);

  const removeAssignment = async (assignmentId: string) => {
    if (window.confirm("Delete this assignment?")) {
      await client.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    }
  };

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
        {isFaculty && (
          <div>
            <Button
              id="wd-add-assignment-group"
              variant="secondary"
              className="me-2"
            >
              <FaPlus className="me-1" /> Group
            </Button>
            <Link
              id="wd-add-assignment"
              href={`/courses/${cid}/assignments/new`}
              className="btn btn-danger"
            >
              <FaPlus className="me-1" /> Assignment
            </Link>
          </div>
        )}
      </div>

      <h3 id="wd-assignments-title" className="border p-3 bg-light">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>

      <ListGroup id="wd-assignment-list" className="rounded-0">
        {assignments.map((assignment) => (
          <ListGroupItem
            key={assignment._id}
            className="wd-assignment-list-item"
          >
            <div className="d-flex justify-content-between align-items-start gap-3">
              <div className="flex-fill">
                {isFaculty ? (
                  <Link
                    href={`/courses/${cid}/assignments/${assignment._id}`}
                    className="wd-assignment-link text-decoration-none"
                  >
                    {assignment.title}
                  </Link>
                ) : (
                  <span className="wd-assignment-link text-decoration-none">
                    {assignment.title}
                  </span>
                )}
                <div className="small text-muted">
                  Multiple Modules | Not available until{" "}
                  {formatDate(assignment.availableFrom)} at 12:00am | Due{" "}
                  {formatDate(assignment.dueDate)} at 11:59pm |{" "}
                  {assignment.points} pts
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                {isFaculty && (
                  <button
                    className="btn btn-link text-danger p-0"
                    onClick={() => void removeAssignment(assignment._id)}
                    aria-label="Delete Assignment"
                  >
                    <FaTrashAlt />
                  </button>
                )}
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
