"use client";

import { useState } from "react";
import { Button, FormCheck, FormControl } from "react-bootstrap";
import { QuizDetails, QuizSubmission } from "./types";

interface Props {
  quiz: QuizDetails;
  submission: QuizSubmission;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  onSubmissionChange: (submission: QuizSubmission) => void;
  onSubmit: () => void | Promise<void>;
  submitLabel: string;
  submitting?: boolean;
}

export default function QuizRunnerForm({
  quiz,
  submission,
  currentIndex,
  setCurrentIndex,
  onSubmissionChange,
  onSubmit,
  submitLabel,
  submitting = false,
}: Props) {
  const [lockedQuestionIds, setLockedQuestionIds] = useState<string[]>([]);
  const currentQuestion = quiz.questions[currentIndex];

  const hasAnswer = (questionId: string) => {
    const answer = submission[questionId];
    if (!answer) {
      return false;
    }

    if (answer.selectedChoiceId) {
      return true;
    }

    if (
      answer.selectedTrueFalse === true ||
      answer.selectedTrueFalse === false
    ) {
      return true;
    }

    return Object.values(answer.blankResponses ?? {}).some((value) =>
      value.trim(),
    );
  };

  const lockCurrentQuestionIfNeeded = () => {
    if (
      !quiz.oneQuestionAtATime ||
      !quiz.lockQuestionsAfterAnswering ||
      !currentQuestion ||
      !hasAnswer(currentQuestion._id) ||
      lockedQuestionIds.includes(currentQuestion._id)
    ) {
      return;
    }

    setLockedQuestionIds((current) => [...current, currentQuestion._id]);
  };

  const moveToQuestion = (index: number) => {
    if (index === currentIndex) {
      return;
    }
    lockCurrentQuestionIfNeeded();
    setCurrentIndex(index);
  };

  const isQuestionLocked = (questionId: string) =>
    quiz.oneQuestionAtATime &&
    quiz.lockQuestionsAfterAnswering &&
    lockedQuestionIds.includes(questionId);

  const setChoiceAnswer = (questionId: string, selectedChoiceId: string) => {
    if (isQuestionLocked(questionId)) {
      return;
    }

    onSubmissionChange({
      ...submission,
      [questionId]: { ...submission[questionId], selectedChoiceId },
    });
  };

  const setTrueFalseAnswer = (
    questionId: string,
    selectedTrueFalse: boolean,
  ) => {
    if (isQuestionLocked(questionId)) {
      return;
    }

    onSubmissionChange({
      ...submission,
      [questionId]: { ...submission[questionId], selectedTrueFalse },
    });
  };

  const setBlankAnswer = (
    questionId: string,
    blankId: string,
    value: string,
  ) => {
    if (isQuestionLocked(questionId)) {
      return;
    }

    onSubmissionChange({
      ...submission,
      [questionId]: {
        ...submission[questionId],
        blankResponses: {
          ...(submission[questionId]?.blankResponses ?? {}),
          [blankId]: value,
        },
      },
    });
  };

  if (!currentQuestion) {
    return (
      <div className="alert alert-secondary mb-0">
        This quiz does not have any questions yet.
      </div>
    );
  }

  const renderQuestion = (
    question: QuizDetails["questions"][number],
    index: number,
    mode: "single" | "all",
  ) => {
    const locked = isQuestionLocked(question._id);

    return (
      <div className="card" key={question._id}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <div className="fw-semibold">
            {mode === "single"
              ? `Question ${index + 1} of ${quiz.questions.length}`
              : `Question ${index + 1}`}
          </div>
          <div>{question.points} pts</div>
        </div>
        <div className="card-body d-flex flex-column gap-3">
          <div className="fw-semibold fs-5">{question.title}</div>
          <div dangerouslySetInnerHTML={{ __html: question.questionHtml }} />

          {locked && (
            <div className="alert alert-secondary mb-0">
              This question is locked after answering.
            </div>
          )}

          {question.type === "MULTIPLE_CHOICE" && (
            <div className="d-flex flex-column gap-2">
              {question.choices.map((choice) => (
                <FormCheck
                  key={choice._id}
                  type="radio"
                  name={`question-${question._id}`}
                  label={choice.text || "Untitled choice"}
                  checked={
                    submission[question._id]?.selectedChoiceId === choice._id
                  }
                  onChange={() => setChoiceAnswer(question._id, choice._id)}
                  disabled={locked}
                />
              ))}
            </div>
          )}

          {question.type === "TRUE_FALSE" && (
            <div className="d-flex flex-column gap-2">
              <FormCheck
                type="radio"
                name={`question-${question._id}`}
                label="True"
                checked={submission[question._id]?.selectedTrueFalse === true}
                onChange={() => setTrueFalseAnswer(question._id, true)}
                disabled={locked}
              />
              <FormCheck
                type="radio"
                name={`question-${question._id}`}
                label="False"
                checked={submission[question._id]?.selectedTrueFalse === false}
                onChange={() => setTrueFalseAnswer(question._id, false)}
                disabled={locked}
              />
            </div>
          )}

          {question.type === "FILL_IN_BLANK" && (
            <div className="d-flex flex-column gap-3">
              {question.blanks.map((blank) => (
                <div key={blank._id}>
                  <div className="fw-semibold mb-1">{blank.label}</div>
                  <FormControl
                    value={
                      submission[question._id]?.blankResponses?.[blank._id] ??
                      ""
                    }
                    onChange={(event) =>
                      setBlankAnswer(
                        question._id,
                        blank._id,
                        event.currentTarget.value,
                      )
                    }
                    disabled={locked}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!quiz.oneQuestionAtATime) {
    return (
      <div className="d-flex flex-column gap-4">
        {quiz.questions.map((question, index) =>
          renderQuestion(question, index, "all"),
        )}
        <div className="d-flex justify-content-end">
          <Button
            variant="danger"
            onClick={() => void onSubmit()}
            disabled={submitting}
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-wrap gap-2">
        {quiz.questions.map((question, index) => (
          <Button
            key={question._id}
            size="sm"
            variant={index === currentIndex ? "danger" : "outline-secondary"}
            onClick={() => moveToQuestion(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      {renderQuestion(currentQuestion, currentIndex, "single")}

      <div className="d-flex justify-content-between gap-2">
        <Button
          variant="secondary"
          onClick={() => moveToQuestion(Math.max(currentIndex - 1, 0))}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>
        {currentIndex < quiz.questions.length - 1 ? (
          <Button
            variant="secondary"
            onClick={() =>
              moveToQuestion(
                Math.min(currentIndex + 1, quiz.questions.length - 1),
              )
            }
          >
            Next
          </Button>
        ) : (
          <Button
            variant="danger"
            onClick={() => void onSubmit()}
            disabled={submitting}
          >
            {submitLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
