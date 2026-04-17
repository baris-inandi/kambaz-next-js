"use client";

import Link from "next/link";

interface Props {
  cid: string;
  qid: string;
  active: "details" | "questions";
}

export default function QuizEditorTabs({ cid, qid, active }: Props) {
  const tabs = [
    {
      label: "Details",
      href: `/courses/${cid}/quizzes/${qid}/editor`,
      key: "details",
    },
    {
      label: "Questions",
      href: `/courses/${cid}/quizzes/${qid}/editor/questions`,
      key: "questions",
    },
  ] as const;

  return (
    <div className="border-bottom mb-4">
      <div className="nav nav-tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={tab.href}
            className={`nav-link ${active === tab.key ? "active" : "text-danger"}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
