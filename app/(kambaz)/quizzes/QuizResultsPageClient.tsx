"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import * as client from "./client";
import QuizAttemptReview from "./QuizAttemptReview";
import { QuizAttempt, QuizDetails } from "./types";
import { formatTimestamp } from "./utils";

interface Props {
  cid: string;
  qid: string;
}

export default function QuizResultsPageClient({ cid, qid }: Props) {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [quiz, setQuiz] = useState<QuizDetails | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
      return;
    }

    if (currentUser.role !== "STUDENT") {
      router.replace(`/courses/${cid}/quizzes/${qid}`);
      return;
    }

    const fetchData = async () => {
      try {
        const [nextQuiz, latestAttempt] = await Promise.all([
          client.findQuizById(cid, qid),
          client.findLatestAttempt(cid, qid),
        ]);
        setQuiz(nextQuiz);
        setAttempt(latestAttempt);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cid, currentUser, qid, router]);

  if (!currentUser) {
    return null;
  }

  if (loading) {
    return <div>Loading results...</div>;
  }

  if (!quiz || !attempt) {
    return <div>No attempt found for this quiz.</div>;
  }

  return (
    <div className="d-flex flex-column gap-4" id="wd-quiz-results">
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div>
          <h2 className="mb-1">{quiz.title}</h2>
          <div className="text-secondary">
            Attempt {attempt.attemptNumber} submitted{" "}
            {formatTimestamp(attempt.submittedAt)}
          </div>
        </div>
        <div className="d-flex gap-2">
          <Link
            href={`/courses/${cid}/quizzes/${qid}`}
            className="btn btn-outline-secondary"
          >
            Quiz Details
          </Link>
          {quiz.canTake && (
            <Link
              href={`/courses/${cid}/quizzes/${qid}/take`}
              className="btn btn-danger"
            >
              Take Again
            </Link>
          )}
        </div>
      </div>

      <div className="alert alert-light border mb-0">
        Score: {attempt.score} / {attempt.maxScore}
      </div>

      <QuizAttemptReview attempt={attempt} />
    </div>
  );
}
