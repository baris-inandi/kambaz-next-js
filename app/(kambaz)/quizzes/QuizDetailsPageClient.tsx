"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAppSelector } from "../hooks";
import * as client from "./client";
import { QuizDetails } from "./types";
import { formatDate, formatTimestamp } from "./utils";

interface Props {
  cid: string;
  qid: string;
}

const blockReason = (reason?: string | null) => {
  if (reason === "NOT_AVAILABLE") {
    return "This quiz is not available yet.";
  }
  if (reason === "CLOSED") {
    return "This quiz is closed.";
  }
  if (reason === "NO_ATTEMPTS_LEFT") {
    return "You have used all available attempts.";
  }
  if (reason === "UNPUBLISHED") {
    return "This quiz is not published.";
  }
  return "";
};

export default function QuizDetailsPageClient({ cid, qid }: Props) {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [quiz, setQuiz] = useState<QuizDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "TA";

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
      return;
    }

    const fetchQuiz = async () => {
      try {
        const nextQuiz = await client.findQuizById(cid, qid);
        setQuiz(nextQuiz);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [cid, currentUser, qid, router]);

  const togglePublish = async () => {
    if (!quiz) {
      return;
    }
    if (quiz.published) {
      await client.unpublishQuiz(cid, qid);
    } else {
      await client.publishQuiz(cid, qid);
    }
    const nextQuiz = await client.findQuizById(cid, qid);
    setQuiz(nextQuiz);
  };

  if (!currentUser) {
    return null;
  }

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  const detailItems = [
    ["Quiz Type", quiz.quizType.replaceAll("_", " ")],
    ["Points", String(quiz.points)],
    ["Assignment Group", quiz.assignmentGroup],
    ["Shuffle Answers", quiz.shuffleAnswers ? "Yes" : "No"],
    [
      "Time Limit",
      quiz.hasTimeLimit ? `${quiz.timeLimitMinutes} Minutes` : "No Time Limit",
    ],
    [
      "Multiple Attempts",
      quiz.multipleAttempts ? `Yes (${quiz.howManyAttempts})` : "No",
    ],
    [
      "Show Correct Answers",
      quiz.showCorrectAnswers === "AFTER_SUBMISSION"
        ? "After Submission"
        : "Never",
    ],
    [
      "Access Code",
      isFaculty
        ? quiz.accessCode || "None"
        : quiz.requiresAccessCode
          ? "Required"
          : "None",
    ],
    ["One Question at a Time", quiz.oneQuestionAtATime ? "Yes" : "No"],
    ["Webcam Required", quiz.webcamRequired ? "Yes" : "No"],
    [
      "Lock Questions After Answering",
      quiz.lockQuestionsAfterAnswering ? "Yes" : "No",
    ],
    ["Due Date", formatDate(quiz.dueDate)],
    ["Available From", formatDate(quiz.availableFrom)],
    ["Available Until", formatDate(quiz.availableUntil)],
  ];

  return (
    <div className="d-flex flex-column gap-4" id="wd-quiz-details">
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div>
          <h2 className="mb-1">{quiz.title}</h2>
          <div
            className="text-secondary"
            dangerouslySetInnerHTML={{ __html: quiz.description }}
          />
        </div>
        {isFaculty ? (
          <div className="d-flex gap-2">
            <Link
              href={`/courses/${cid}/quizzes/${qid}/preview`}
              className="btn btn-outline-secondary"
            >
              Preview
            </Link>
            <Link
              href={`/courses/${cid}/quizzes/${qid}/editor`}
              className="btn btn-secondary"
            >
              Edit
            </Link>
            <Button
              variant={quiz.published ? "outline-danger" : "danger"}
              onClick={() => void togglePublish()}
            >
              {quiz.published ? "Unpublish" : "Publish"}
            </Button>
          </div>
        ) : (
          <div className="d-flex flex-column align-items-end gap-2">
            {quiz.latestAttemptSummary && (
              <div className="small text-secondary">
                Last score: {quiz.latestAttemptSummary.score} /{" "}
                {quiz.latestAttemptSummary.maxScore}
              </div>
            )}
            <div className="d-flex gap-2">
              {quiz.canTake ? (
                <Link
                  href={`/courses/${cid}/quizzes/${qid}/take`}
                  className="btn btn-danger"
                >
                  Start Quiz
                </Link>
              ) : (
                <Button variant="outline-secondary" disabled>
                  Start Quiz
                </Button>
              )}
              {quiz.latestAttemptSummary && (
                <Link
                  href={`/courses/${cid}/quizzes/${qid}/results`}
                  className="btn btn-outline-secondary"
                >
                  View Last Attempt
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {!isFaculty && quiz.takeBlockedReason && (
        <div className="alert alert-secondary mb-0">
          {blockReason(quiz.takeBlockedReason)}
        </div>
      )}

      {quiz.latestAttemptSummary && !isFaculty && (
        <div className="small text-secondary">
          Attempt {quiz.latestAttemptSummary.attemptNumber} submitted{" "}
          {formatTimestamp(quiz.latestAttemptSummary.submittedAt)}
        </div>
      )}

      <div className="card">
        <div className="card-header fw-semibold">Quiz Details</div>
        <div className="list-group list-group-flush">
          {detailItems.map(([label, value]) => (
            <div
              key={label}
              className="list-group-item d-flex justify-content-between gap-3"
            >
              <span className="text-secondary">{label}</span>
              <span className="text-end">{value}</span>
            </div>
          ))}
          {!isFaculty && (
            <>
              <div className="list-group-item d-flex justify-content-between gap-3">
                <span className="text-secondary">Attempts Allowed</span>
                <span>{quiz.attemptsAllowed}</span>
              </div>
              <div className="list-group-item d-flex justify-content-between gap-3">
                <span className="text-secondary">Attempts Used</span>
                <span>{quiz.attemptsUsed}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
