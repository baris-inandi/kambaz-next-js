"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAppSelector } from "../hooks";
import * as client from "./client";
import QuizAttemptReview from "./QuizAttemptReview";
import QuizRunnerForm from "./QuizRunnerForm";
import { QuizAttempt, QuizDetails, QuizSubmission } from "./types";
import { gradeQuizLocally, prepareQuizForRun } from "./utils";

interface Props {
  cid: string;
  qid: string;
}

export default function QuizPreviewPageClient({ cid, qid }: Props) {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [quiz, setQuiz] = useState<QuizDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState<QuizSubmission>({});
  const [result, setResult] = useState<QuizAttempt | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
      return;
    }

    if (!(currentUser.role === "FACULTY" || currentUser.role === "TA")) {
      router.replace(`/courses/${cid}/quizzes/${qid}`);
      return;
    }

    const fetchQuiz = async () => {
      try {
        const nextQuiz = await client.findQuizById(cid, qid);
        setQuiz(prepareQuizForRun(nextQuiz));
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [cid, currentUser, qid, router]);

  const submitPreview = () => {
    if (!quiz) {
      return;
    }
    setResult(gradeQuizLocally(quiz, submission));
  };

  if (!currentUser) {
    return null;
  }

  if (loading) {
    return <div>Loading preview...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  return (
    <div className="d-flex flex-column gap-4" id="wd-quiz-preview">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-1">Preview: {quiz.title}</h2>
          <div className="text-secondary">
            Faculty preview attempts are not saved.
          </div>
        </div>
        <Link
          href={`/courses/${cid}/quizzes/${qid}/editor/questions`}
          className="btn btn-secondary"
        >
          Edit Quiz
        </Link>
      </div>

      {result ? (
        <div className="d-flex flex-column gap-3">
          <div className="alert alert-light border mb-0">
            Score: {result.score} / {result.maxScore}
          </div>
          <QuizAttemptReview attempt={result} />
          <div>
            <Button variant="danger" onClick={() => setResult(null)}>
              Preview Again
            </Button>
          </div>
        </div>
      ) : (
        <QuizRunnerForm
          quiz={quiz}
          submission={submission}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onSubmissionChange={setSubmission}
          onSubmit={submitPreview}
          submitLabel="Submit Preview"
        />
      )}
    </div>
  );
}
