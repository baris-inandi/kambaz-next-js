"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
} from "react-bootstrap";
import { useAppSelector } from "../hooks";
import RichTextEditor from "../pazza/RichTextEditor";
import * as client from "./client";
import QuizEditorTabs from "./QuizEditorTabs";
import { QuizDetails } from "./types";
import { calculateQuizPoints } from "./utils";

interface Props {
  cid: string;
  qid: string;
}

export default function QuizEditorPageClient({ cid, qid }: Props) {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [quiz, setQuiz] = useState<QuizDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
      return;
    }

    if (!(currentUser.role === "FACULTY" || currentUser.role === "TA")) {
      router.replace(`/courses/${cid}/quizzes`);
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

  const setField = (
    key: keyof QuizDetails,
    value: string | number | boolean,
  ) => {
    if (!quiz) {
      return;
    }
    setQuiz({ ...quiz, [key]: value } as QuizDetails);
  };

  const save = async (publish = false) => {
    if (!quiz) {
      return;
    }

    setSaving(true);
    try {
      await client.updateQuiz(cid, qid, {
        ...quiz,
        points: calculateQuizPoints(quiz),
      });
      if (publish) {
        await client.publishQuiz(cid, qid);
        router.push(`/courses/${cid}/quizzes`);
        return;
      }
      router.push(`/courses/${cid}/quizzes/${qid}`);
    } finally {
      setSaving(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  if (loading) {
    return <div>Loading quiz editor...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  return (
    <div
      className="container px-0 d-flex flex-column gap-4"
      id="wd-quiz-editor"
    >
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Edit Quiz</h2>
        <div className="d-flex gap-2">
          <Button
            variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes`)}
          >
            Cancel
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => void save()}
            disabled={saving}
          >
            Save
          </Button>
          <Button
            variant="danger"
            onClick={() => void save(true)}
            disabled={saving}
          >
            Save and Publish
          </Button>
        </div>
      </div>

      <QuizEditorTabs cid={cid} qid={qid} active="details" />

      <div className="d-flex flex-column gap-3">
        <div>
          <FormLabel>Title</FormLabel>
          <FormControl
            value={quiz.title}
            onChange={(event) => setField("title", event.currentTarget.value)}
          />
        </div>

        <div>
          <FormLabel>Description</FormLabel>
          <RichTextEditor
            value={quiz.description}
            onChange={(value) => setField("description", value)}
            placeholder="Enter a quiz description"
          />
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <FormLabel>Quiz Type</FormLabel>
            <FormSelect
              value={quiz.quizType}
              onChange={(event) =>
                setField("quizType", event.currentTarget.value)
              }
            >
              <option value="GRADED_QUIZ">Graded Quiz</option>
              <option value="PRACTICE_QUIZ">Practice Quiz</option>
              <option value="GRADED_SURVEY">Graded Survey</option>
              <option value="UNGRADED_SURVEY">Ungraded Survey</option>
            </FormSelect>
          </div>

          <div className="col-md-6">
            <FormLabel>Assignment Group</FormLabel>
            <FormSelect
              value={quiz.assignmentGroup}
              onChange={(event) =>
                setField("assignmentGroup", event.currentTarget.value)
              }
            >
              <option value="QUIZZES">Quizzes</option>
              <option value="EXAMS">Exams</option>
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="PROJECT">Project</option>
            </FormSelect>
          </div>

          <div className="hidden col-md-4">
            <FormLabel>Points</FormLabel>
            <FormControl value={calculateQuizPoints(quiz)} readOnly />
          </div>

          <div className="col-md-4">
            <FormLabel>Due Date</FormLabel>
            <FormControl
              type="date"
              value={quiz.dueDate}
              onChange={(event) =>
                setField("dueDate", event.currentTarget.value)
              }
            />
          </div>

          <div className="col-md-4">
            <FormLabel>Available From</FormLabel>
            <FormControl
              type="date"
              value={quiz.availableFrom}
              onChange={(event) =>
                setField("availableFrom", event.currentTarget.value)
              }
            />
          </div>

          <div className="col-md-4">
            <FormLabel>Available Until</FormLabel>
            <FormControl
              type="date"
              value={quiz.availableUntil}
              onChange={(event) =>
                setField("availableUntil", event.currentTarget.value)
              }
            />
          </div>

          <div className="col-md-4">
            <FormLabel>Show Correct Answers</FormLabel>
            <FormSelect
              value={quiz.showCorrectAnswers}
              onChange={(event) =>
                setField("showCorrectAnswers", event.currentTarget.value)
              }
            >
              <option value="AFTER_SUBMISSION">After Submission</option>
              <option value="NEVER">Never</option>
            </FormSelect>
          </div>

          <div className="col-md-4">
            <FormLabel>Access Code</FormLabel>
            <FormControl
              value={quiz.accessCode ?? ""}
              onChange={(event) =>
                setField("accessCode", event.currentTarget.value)
              }
            />
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <FormCheck
              label="Shuffle Answers"
              checked={quiz.shuffleAnswers}
              onChange={(event) =>
                setField("shuffleAnswers", event.currentTarget.checked)
              }
            />
          </div>

          <div className="col-md-6">
            <FormCheck
              label="One Question at a Time"
              checked={quiz.oneQuestionAtATime}
              onChange={(event) =>
                setField("oneQuestionAtATime", event.currentTarget.checked)
              }
            />
          </div>

          <div className="col-md-6">
            <FormCheck
              label="Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(event) =>
                setField("multipleAttempts", event.currentTarget.checked)
              }
            />
          </div>

          <div className="col-md-6">
            <FormCheck
              label="Time Limit"
              checked={quiz.hasTimeLimit}
              onChange={(event) =>
                setField("hasTimeLimit", event.currentTarget.checked)
              }
            />
          </div>

          <div className="col-md-6">
            <FormCheck
              label="Webcam Required"
              checked={quiz.webcamRequired}
              onChange={(event) =>
                setField("webcamRequired", event.currentTarget.checked)
              }
            />
          </div>

          <div className="col-md-6">
            <FormCheck
              label="Lock Questions After Answering"
              checked={quiz.lockQuestionsAfterAnswering}
              onChange={(event) =>
                setField(
                  "lockQuestionsAfterAnswering",
                  event.currentTarget.checked,
                )
              }
            />
          </div>

          <div className="col-md-6">
            <FormLabel>How Many Attempts</FormLabel>
            <FormControl
              type="number"
              value={quiz.howManyAttempts}
              onChange={(event) =>
                setField(
                  "howManyAttempts",
                  Number(event.currentTarget.value || 1),
                )
              }
              disabled={!quiz.multipleAttempts}
            />
          </div>

          <div className="col-md-6">
            <FormLabel>Time Limit Minutes</FormLabel>
            <FormControl
              type="number"
              value={quiz.timeLimitMinutes}
              onChange={(event) =>
                setField(
                  "timeLimitMinutes",
                  Number(event.currentTarget.value || 0),
                )
              }
              disabled={!quiz.hasTimeLimit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
