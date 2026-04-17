"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useAppSelector } from "../hooks";
import * as client from "./client";
import QuizEditorTabs from "./QuizEditorTabs";
import QuizQuestionEditorCard from "./QuizQuestionEditorCard";
import { QuizDetails, QuizQuestion } from "./types";
import { calculateQuizPoints, createQuestion } from "./utils";

interface Props {
  cid: string;
  qid: string;
}

export default function QuizQuestionsEditorPageClient({ cid, qid }: Props) {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [quiz, setQuiz] = useState<QuizDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, QuizQuestion>>({});
  const [editingIds, setEditingIds] = useState<string[]>([]);
  const [newIds, setNewIds] = useState<string[]>([]);

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

  const saveQuiz = async (publish = false) => {
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

  const addQuestion = () => {
    if (!quiz) {
      return;
    }

    const newQuestion = createQuestion();
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
    setDrafts((current) => ({ ...current, [newQuestion._id]: newQuestion }));
    setEditingIds((current) => [...current, newQuestion._id]);
    setNewIds((current) => [...current, newQuestion._id]);
  };

  const startEdit = (question: QuizQuestion) => {
    setDrafts((current) => ({
      ...current,
      [question._id]: JSON.parse(JSON.stringify(question)) as QuizQuestion,
    }));
    setEditingIds((current) =>
      current.includes(question._id) ? current : [...current, question._id],
    );
  };

  const saveQuestion = (questionId: string) => {
    if (!quiz || !drafts[questionId]) {
      return;
    }

    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question) =>
        question._id === questionId ? drafts[questionId] : question,
      ),
    });
    setEditingIds((current) => current.filter((id) => id !== questionId));
    setDrafts((current) => {
      const nextDrafts = { ...current };
      delete nextDrafts[questionId];
      return nextDrafts;
    });
    setNewIds((current) => current.filter((id) => id !== questionId));
  };

  const cancelQuestion = (questionId: string) => {
    if (!quiz) {
      return;
    }

    const isNew = newIds.includes(questionId);
    if (isNew) {
      setQuiz({
        ...quiz,
        questions: quiz.questions.filter(
          (question) => question._id !== questionId,
        ),
      });
      setNewIds((current) => current.filter((id) => id !== questionId));
    }

    setEditingIds((current) => current.filter((id) => id !== questionId));
    setDrafts((current) => {
      const nextDrafts = { ...current };
      delete nextDrafts[questionId];
      return nextDrafts;
    });
  };

  const deleteQuestion = (questionId: string) => {
    if (!quiz || !window.confirm("Delete this question?")) {
      return;
    }

    setQuiz({
      ...quiz,
      questions: quiz.questions.filter(
        (question) => question._id !== questionId,
      ),
    });
    setEditingIds((current) => current.filter((id) => id !== questionId));
    setDrafts((current) => {
      const nextDrafts = { ...current };
      delete nextDrafts[questionId];
      return nextDrafts;
    });
    setNewIds((current) => current.filter((id) => id !== questionId));
  };

  const totalPoints = useMemo(
    () => (quiz ? calculateQuizPoints(quiz) : 0),
    [quiz],
  );

  if (!currentUser) {
    return null;
  }

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  return (
    <div
      className="container px-0 d-flex flex-column gap-4"
      id="wd-quiz-questions-editor"
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h2 className="mb-0">Quiz Questions</h2>
        <div className="d-flex gap-2">
          <Button
            variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes`)}
          >
            Cancel
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => void saveQuiz()}
            disabled={saving}
          >
            Save
          </Button>
          <Button
            variant="danger"
            onClick={() => void saveQuiz(true)}
            disabled={saving}
          >
            Save and Publish
          </Button>
        </div>
      </div>

      <QuizEditorTabs cid={cid} qid={qid} active="questions" />

      <div className="d-flex justify-content-between align-items-center">
        <div className="text-secondary">Total Points: {totalPoints}</div>
        <Button variant="danger" onClick={addQuestion}>
          <FaPlus className="me-1" />
          New Question
        </Button>
      </div>

      {!quiz.questions.length && (
        <div className="alert alert-light border mb-0">
          This quiz does not have any questions yet.
        </div>
      )}

      <div className="d-flex flex-column gap-3">
        {quiz.questions.map((question, index) =>
          editingIds.includes(question._id) ? (
            <QuizQuestionEditorCard
              key={question._id}
              question={drafts[question._id] ?? question}
              onChange={(nextQuestion) =>
                setDrafts((current) => ({
                  ...current,
                  [question._id]: nextQuestion,
                }))
              }
              onSave={() => saveQuestion(question._id)}
              onCancel={() => cancelQuestion(question._id)}
            />
          ) : (
            <div key={question._id} className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div className="fw-semibold">
                  {index + 1}. {question.title}
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => startEdit(question)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteQuestion(question._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div className="card-body">
                <div className="small text-secondary mb-2">
                  {question.type.replaceAll("_", " ")} | {question.points} pts
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: question.questionHtml }}
                />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
