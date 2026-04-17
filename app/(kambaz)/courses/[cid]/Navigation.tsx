"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  cid: string;
  variant?: "desktop" | "mobile";
  includeIds?: boolean;
  onNavigate?: () => void;
}

export default function CourseNavigation({
  cid,
  variant = "desktop",
  includeIds = true,
  onNavigate,
}: Props) {
  const pathname = usePathname();

  const links = [
    { label: "Home", path: "home", id: "wd-course-home-link" },
    { label: "Modules", path: "modules", id: "wd-course-modules-link" },
    { label: "Pazza", path: "pazza", id: "wd-course-piazza-link" },
    { label: "Zoom", path: "zoom", id: "wd-course-zoom-link" },
    {
      label: "Assignments",
      path: "assignments",
      id: "wd-course-assignments-link",
    },
    { label: "Quizzes", path: "quizzes", id: "wd-course-quizzes-link" },
    { label: "Grades", path: "grades", id: "wd-course-grades-link" },
    { label: "People", path: "people/table", id: "wd-course-people-link" },
  ];

  return (
    <div
      id={includeIds ? "wd-courses-navigation" : undefined}
      className={`wd list-group fs-5 rounded-0 ${variant === "desktop" ? "me-4" : ""}`}
    >
      {links.map((link) => {
        const fullPath = `/courses/${cid}/${link.path}`;
        const topSection = link.path.split("/")[0];
        const active =
          link.path === "home"
            ? pathname === fullPath || pathname === `/courses/${cid}`
            : pathname.startsWith(`/courses/${cid}/${topSection}`);

        return (
          <Link
            key={link.label}
            href={fullPath}
            id={includeIds ? link.id : undefined}
            className={`list-group-item border-0 ${active ? "active" : "text-danger"}`}
            onClick={onNavigate}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
