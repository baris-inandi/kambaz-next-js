"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { useAppSelector } from "../hooks";
import * as client from "./client";
import QuizRunnerForm from "./QuizRunnerForm";
import { QuizDetails, QuizSubmission } from "./types";
import { prepareQuizForRun } from "./utils";

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
  return "You cannot take this quiz right now.";
};

export default function QuizTakePageClient({ cid, qid }: Props) {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [quiz, setQuiz] = useState<QuizDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState<QuizSubmission>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accessCode, setAccessCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
      return;
    }

    if (currentUser.role !== "STUDENT") {
      router.replace(`/courses/${cid}/quizzes/${qid}`);
      return;
    }

    const fetchQuiz = async () => {
      try {
        const nextQuiz = await client.findQuizById(cid, qid);
        setQuiz(prepareQuizForRun(nextQuiz));
        setUnlocked(!nextQuiz.requiresAccessCode);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [cid, currentUser, qid, router]);

  const submit = async () => {
    if (!quiz) {
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await client.submitQuizAttempt(cid, qid, {
        accessCode,
        answers: submission,
      });
      router.replace(`/courses/${cid}/quizzes/${qid}/results`);
    } catch {
      setError(
        quiz.requiresAccessCode
          ? "Unable to submit quiz. Check your access code and answers."
          : "Unable to submit quiz.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const unlockQuiz = async () => {
    if (!quiz) {
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await client.validateQuizAccessCode(cid, qid, accessCode);
      setUnlocked(true);
    } catch {
      setError("Invalid access code.");
    } finally {
      setSubmitting(false);
    }
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

  if (!quiz.canTake) {
    return (
      <div className="d-flex flex-column gap-3">
        <div className="alert alert-secondary mb-0">
          {blockReason(quiz.takeBlockedReason)}
        </div>
        {quiz.latestAttemptSummary && (
          <Link
            href={`/courses/${cid}/quizzes/${qid}/results`}
            className="btn btn-outline-secondary align-self-start"
          >
            View Last Attempt
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-4" id="wd-quiz-take">
      <div>
        <h2 className="mb-1">{quiz.title}</h2>
        <div className="text-secondary">
          Attempt {(quiz.attemptsUsed ?? 0) + 1} of {quiz.attemptsAllowed}
        </div>
      </div>

      {quiz.requiresAccessCode && !unlocked && (
        <div className="card">
          <div className="card-body">
            <div className="fw-semibold mb-2">Access Code</div>
            <FormControl
              type="password"
              value={accessCode}
              onChange={(event) => setAccessCode(event.currentTarget.value)}
              placeholder="Enter the quiz access code"
            />
            <div className="mt-3">
              <button
                className="btn btn-danger"
                onClick={() => void unlockQuiz()}
                disabled={submitting}
              >
                Unlock Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {error && <div className="alert alert-danger mb-0">{error}</div>}

      {unlocked && (
        <QuizRunnerForm
          quiz={quiz}
          submission={submission}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onSubmissionChange={setSubmission}
          onSubmit={submit}
          submitLabel="Submit Quiz"
          submitting={submitting}
        />
      )}
    </div>
  );
}
