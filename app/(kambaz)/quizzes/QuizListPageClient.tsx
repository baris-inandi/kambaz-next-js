"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button, Dropdown, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaBan, FaCheckCircle, FaPlus, FaTrashAlt } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { useAppSelector } from "../hooks";
import * as client from "./client";
import { QuizSummary } from "./types";
import { formatDate, getAvailabilityLabel } from "./utils";

interface Props {
  cid: string;
}

export default function QuizListPageClient({ cid }: Props) {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "TA";

  const loadQuizzes = useCallback(async () => {
    const nextQuizzes = await client.findQuizzesForCourse(cid);
    setQuizzes(nextQuizzes);
  }, [cid]);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
      return;
    }

    const fetchQuizzes = async () => {
      try {
        await loadQuizzes();
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [currentUser, loadQuizzes, router]);

  const createQuiz = async () => {
    const createdQuiz = await client.createQuizForCourse(cid);
    router.push(`/courses/${cid}/quizzes/${createdQuiz._id}/editor`);
  };

  const togglePublish = async (quiz: QuizSummary) => {
    if (quiz.published) {
      await client.unpublishQuiz(cid, quiz._id);
    } else {
      await client.publishQuiz(cid, quiz._id);
    }
    await loadQuizzes();
  };

  const removeQuiz = async (quizId: string) => {
    if (!window.confirm("Delete this quiz?")) {
      return;
    }
    await client.deleteQuiz(cid, quizId);
    await loadQuizzes();
  };

  if (!currentUser) {
    return null;
  }

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  return (
    <div className="d-flex flex-column gap-3" id="wd-quizzes">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Quizzes</h2>
        {isFaculty && (
          <Button variant="danger" onClick={() => void createQuiz()}>
            <FaPlus className="me-1" />
            Quiz
          </Button>
        )}
      </div>

      {!quizzes.length && (
        <div className="alert alert-light border mb-0">
          {isFaculty
            ? "No quizzes yet. Click the + Quiz button to add one."
            : "No quizzes are available in this course yet."}
        </div>
      )}

      {!!quizzes.length && (
        <ListGroup className="rounded-0">
          {quizzes.map((quiz) => (
            <ListGroupItem key={quiz._id} className="py-3">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <button
                  className="btn btn-link p-0 text-decoration-none"
                  onClick={() => void togglePublish(quiz)}
                  disabled={!isFaculty}
                >
                  {quiz.published ? (
                    <FaCheckCircle className="text-success fs-5" />
                  ) : (
                    <FaBan className="text-secondary fs-5" />
                  )}
                </button>

                <div className="flex-fill">
                  <Link
                    href={`/courses/${cid}/quizzes/${quiz._id}`}
                    className="fw-semibold text-decoration-none"
                  >
                    {quiz.title}
                  </Link>
                  <div className="small text-muted mt-1">
                    {getAvailabilityLabel(quiz)} | Due{" "}
                    {formatDate(quiz.dueDate)} | {quiz.points} pts |{" "}
                    {quiz.questionCount} Questions
                    {!isFaculty && quiz.lastScore !== null && (
                      <>
                        {" "}
                        | Score {quiz.lastScore} / {quiz.lastMaxScore}
                      </>
                    )}
                  </div>
                </div>

                {isFaculty && (
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="light"
                      className="border-0 p-1"
                      id={`wd-quiz-menu-${quiz._id}`}
                    >
                      <IoEllipsisVertical />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() =>
                          router.push(`/courses/${cid}/quizzes/${quiz._id}`)
                        }
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => void togglePublish(quiz)}>
                        {quiz.published ? "Unpublish" : "Publish"}
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-danger"
                        onClick={() => void removeQuiz(quiz._id)}
                      >
                        <FaTrashAlt className="me-2" />
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
