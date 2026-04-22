"use client";

import {
  Button,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
} from "react-bootstrap";
import RichTextEditor from "../pazza/RichTextEditor";
import { QuizBlank, QuizQuestion } from "./types";
import { createQuestion } from "./utils";

interface Props {
  question: QuizQuestion;
  onChange: (question: QuizQuestion) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function QuizQuestionEditorCard({
  question,
  onChange,
  onSave,
  onCancel,
}: Props) {
  const setField = (
    key: keyof QuizQuestion,
    value: string | number | boolean | QuizBlank[] | QuizQuestion["choices"],
  ) => {
    onChange({ ...question, [key]: value } as QuizQuestion);
  };

  const changeType = (nextType: QuizQuestion["type"]) => {
    const nextQuestion = createQuestion(nextType);
    onChange({
      ...nextQuestion,
      _id: question._id,
      title: question.title,
      points: question.points,
      questionHtml: question.questionHtml,
    });
  };

  const addChoice = () => {
    if (question.type !== "MULTIPLE_CHOICE") {
      return;
    }

    setField("choices", [
      ...question.choices,
      { _id: crypto.randomUUID(), text: "", isCorrect: false },
    ]);
  };

  const updateChoice = (
    choiceId: string,
    updates: { text?: string; isCorrect?: boolean },
  ) => {
    if (question.type !== "MULTIPLE_CHOICE") {
      return;
    }

    setField(
      "choices",
      question.choices.map((choice) =>
        updates.isCorrect
          ? { ...choice, isCorrect: choice._id === choiceId }
          : choice._id === choiceId
            ? { ...choice, ...updates }
            : choice,
      ),
    );
  };

  const removeChoice = (choiceId: string) => {
    if (question.type !== "MULTIPLE_CHOICE" || question.choices.length <= 2) {
      return;
    }

    const nextChoices = question.choices.filter(
      (choice) => choice._id !== choiceId,
    );
    const hasCorrectChoice = nextChoices.some((choice) => choice.isCorrect);
    setField(
      "choices",
      nextChoices.map((choice, index) => ({
        ...choice,
        isCorrect: hasCorrectChoice ? choice.isCorrect : index === 0,
      })),
    );
  };

  const addBlank = () => {
    if (question.type !== "FILL_IN_BLANK") {
      return;
    }

    setField("blanks", [
      ...question.blanks,
      {
        _id: crypto.randomUUID(),
        label: `Blank ${question.blanks.length + 1}`,
        acceptedAnswers: [""],
      },
    ]);
  };

  const updateBlank = (
    blankId: string,
    updates: { label?: string; acceptedAnswers?: string[] },
  ) => {
    if (question.type !== "FILL_IN_BLANK") {
      return;
    }

    setField(
      "blanks",
      question.blanks.map((blank) =>
        blank._id === blankId ? { ...blank, ...updates } : blank,
      ),
    );
  };

  const removeBlank = (blankId: string) => {
    if (question.type !== "FILL_IN_BLANK") {
      return;
    }

    setField(
      "blanks",
      question.blanks.filter((blank) => blank._id !== blankId),
    );
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="fw-semibold">Edit Question</div>
        <FormSelect
          style={{ maxWidth: "260px" }}
          value={question.type}
          onChange={(event) =>
            changeType(event.currentTarget.value as QuizQuestion["type"])
          }
        >
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="TRUE_FALSE">True / False</option>
          <option value="FILL_IN_BLANK">Fill In the Blank</option>
        </FormSelect>
      </div>
      <div className="card-body d-flex flex-column gap-3">
        <div>
          <FormLabel>Title</FormLabel>
          <FormControl
            value={question.title}
            onChange={(event) => setField("title", event.currentTarget.value)}
          />
        </div>

        <div>
          <FormLabel>Points</FormLabel>
          <FormControl
            type="number"
            value={question.points}
            onChange={(event) =>
              setField("points", Number(event.currentTarget.value || 0))
            }
          />
        </div>

        <div>
          <FormLabel>Question</FormLabel>
          <RichTextEditor
            value={question.questionHtml}
            onChange={(value) => setField("questionHtml", value)}
            placeholder="Enter your question"
          />
        </div>

        {question.type === "MULTIPLE_CHOICE" && (
          <div className="d-flex flex-column gap-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="fw-semibold">Choices</div>
              <Button variant="outline-danger" size="sm" onClick={addChoice}>
                Add Choice
              </Button>
            </div>
            {question.choices.map((choice, index) => (
              <div key={choice._id} className="border rounded p-3">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                  <FormCheck
                    type="radio"
                    name={`correct-choice-${question._id}`}
                    label={`Option ${index + 1}`}
                    checked={Boolean(choice.isCorrect)}
                    onChange={() =>
                      updateChoice(choice._id, { isCorrect: true })
                    }
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => removeChoice(choice._id)}
                    disabled={question.choices.length <= 2}
                  >
                    Remove
                  </Button>
                </div>
                <FormControl
                  as="textarea"
                  rows={2}
                  value={choice.text}
                  onChange={(event) =>
                    updateChoice(choice._id, {
                      text: event.currentTarget.value,
                    })
                  }
                />
              </div>
            ))}
          </div>
        )}

        {question.type === "TRUE_FALSE" && (
          <div className="d-flex flex-column gap-2">
            <div className="fw-semibold">Correct Answer</div>
            <FormCheck
              type="radio"
              name={`true-false-${question._id}`}
              label="True"
              checked={Boolean(question.correctAnswer)}
              onChange={() => setField("correctAnswer", true)}
            />
            <FormCheck
              type="radio"
              name={`true-false-${question._id}`}
              label="False"
              checked={!question.correctAnswer}
              onChange={() => setField("correctAnswer", false)}
            />
          </div>
        )}

        {question.type === "FILL_IN_BLANK" && (
          <div className="d-flex flex-column gap-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="fw-semibold">Blanks</div>
              <Button variant="outline-danger" size="sm" onClick={addBlank}>
                Add Blank
              </Button>
            </div>
            {question.blanks.map((blank, index) => (
              <div key={blank._id} className="border rounded p-3">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                  <div className="flex-fill">
                    <FormLabel>Label</FormLabel>
                    <FormControl
                      value={blank.label}
                      onChange={(event) =>
                        updateBlank(blank._id, {
                          label: event.currentTarget.value,
                        })
                      }
                    />
                  </div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => removeBlank(blank._id)}
                    disabled={question.blanks.length <= 1}
                  >
                    Remove
                  </Button>
                </div>
                <FormLabel>Accepted Answers</FormLabel>
                <FormControl
                  as="textarea"
                  rows={3}
                  value={(blank.acceptedAnswers ?? []).join("\n")}
                  onChange={(event) =>
                    updateBlank(blank._id, {
                      acceptedAnswers: event.currentTarget.value
                        .split("\n")
                        .map((answer) => answer.trim()),
                    })
                  }
                  placeholder={`Accepted answers for blank ${index + 1}, one per line`}
                />
              </div>
            ))}
          </div>
        )}

        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onSave}>
            Save Question
          </Button>
        </div>
      </div>
    </div>
  );
}
