"use client";

import { QuizAttempt } from "./types";

interface Props {
  attempt: QuizAttempt;
}

export default function QuizAttemptReview({ attempt }: Props) {
  return (
    <div className="d-flex flex-column gap-3">
      {attempt.answers.map((answer, index) => (
        <div
          key={answer.questionId}
          className={`card ${answer.isCorrect ? "border-success" : "border-danger"}`}
        >
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="fw-semibold">
              {index + 1}. {answer.title}
            </div>
            <div className={answer.isCorrect ? "text-success" : "text-danger"}>
              {answer.earnedPoints} / {answer.points} pts
            </div>
          </div>
          <div className="card-body">
            <div
              className="mb-3"
              dangerouslySetInnerHTML={{ __html: answer.questionHtml }}
            />

            {answer.type === "MULTIPLE_CHOICE" && (
              <div className="d-flex flex-column gap-2">
                {answer.choices.map((choice) => {
                  const selected = answer.selectedChoiceId === choice._id;
                  const correct = choice.isCorrect;
                  const tone =
                    correct && selected
                      ? "border-success bg-success-subtle"
                      : correct
                        ? "border-success"
                        : selected && answer.isCorrect
                          ? "border-success bg-success-subtle"
                          : selected
                            ? "border-danger bg-danger-subtle"
                            : "border-light";

                  return (
                    <div
                      key={choice._id}
                      className={`border rounded p-2 ${tone}`}
                    >
                      <div className="d-flex justify-content-between gap-3">
                        <span>{choice.text || "Untitled choice"}</span>
                        <span className="small text-secondary">
                          {selected ? "Your answer" : ""}
                          {selected && (correct || answer.isCorrect)
                            ? " • Correct"
                            : ""}
                          {selected && !correct && !answer.isCorrect
                            ? " • Incorrect"
                            : ""}
                          {!selected && correct ? "Correct answer" : ""}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {answer.type === "TRUE_FALSE" && (
              <div className="d-flex flex-column gap-2">
                {["True", "False"].map((label, optionIndex) => {
                  const value = optionIndex === 0;
                  const selected = answer.selectedTrueFalse === value;
                  const correct = answer.correctTrueFalse === value;
                  const tone =
                    correct && selected
                      ? "border-success bg-success-subtle"
                      : correct
                        ? "border-success"
                        : selected && answer.isCorrect
                          ? "border-success bg-success-subtle"
                          : selected
                            ? "border-danger bg-danger-subtle"
                            : "border-light";
                  return (
                    <div key={label} className={`border rounded p-2 ${tone}`}>
                      <div className="d-flex justify-content-between gap-3">
                        <span>{label}</span>
                        <span className="small text-secondary">
                          {selected ? "Your answer" : ""}
                          {selected && (correct || answer.isCorrect)
                            ? " • Correct"
                            : ""}
                          {selected && !correct && !answer.isCorrect
                            ? " • Incorrect"
                            : ""}
                          {!selected && correct ? "Correct answer" : ""}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {answer.type === "FILL_IN_BLANK" && (
              <div className="d-flex flex-column gap-2">
                {answer.blankResponses.map((blank) => (
                  <div
                    key={blank._id}
                    className={`border rounded p-2 ${blank.isCorrect ? "border-success bg-success-subtle" : "border-danger bg-danger-subtle"}`}
                  >
                    <div className="fw-semibold">{blank.label}</div>
                    <div className="small mb-1">
                      Your answer: {blank.response || "No answer"}
                    </div>
                    {blank.acceptedAnswers &&
                      blank.acceptedAnswers.length > 0 && (
                        <div className="small text-secondary">
                          Accepted answers: {blank.acceptedAnswers.join(", ")}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
