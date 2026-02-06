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

  const base = `/courses/${cid}`;
  const isHome = pathname === `${base}/home` || pathname === base;
  const isModules = pathname.startsWith(`${base}/modules`);
  const isPiazza = pathname.startsWith(`${base}/piazza`);
  const isZoom = pathname.startsWith(`${base}/zoom`);
  const isAssignments = pathname.startsWith(`${base}/assignments`);
  const isQuizzes = pathname.startsWith(`${base}/quizzes`);
  const isGrades = pathname.startsWith(`${base}/grades`);
  const isPeople = pathname.startsWith(`${base}/people`);

  return (
    <div
      id={includeIds ? "wd-courses-navigation" : undefined}
      className={`wd list-group fs-5 rounded-0 ${variant === "desktop" ? "me-4" : ""}`}
    >
      <Link
        href={`/courses/${cid}/home`}
        id={includeIds ? "wd-course-home-link" : undefined}
        className={`list-group-item border-0 ${isHome ? "active" : "text-danger"}`}
        onClick={onNavigate}
      >
        Home
      </Link>
      <Link
        href={`/courses/${cid}/modules`}
        id={includeIds ? "wd-course-modules-link" : undefined}
        className={`list-group-item border-0 ${isModules ? "active" : "text-danger"}`}
        onClick={onNavigate}
      >
        Modules
      </Link>
      <Link
        href={`/courses/${cid}/piazza`}
        id={includeIds ? "wd-course-piazza-link" : undefined}
        className={`list-group-item border-0 ${isPiazza ? "active" : "text-danger"}`}
        onClick={onNavigate}
      >
        Piazza
      </Link>
      <Link
        href={`/courses/${cid}/zoom`}
        id={includeIds ? "wd-course-zoom-link" : undefined}
        className={`list-group-item border-0 ${isZoom ? "active" : "text-danger"}`}
        onClick={onNavigate}
      >
        Zoom
      </Link>
      <Link
        href={`/courses/${cid}/assignments`}
        id={includeIds ? "wd-course-assignments-link" : undefined}
        className={`list-group-item border-0 ${isAssignments ? "active" : "text-danger"}`}
        onClick={onNavigate}
      >
        Assignments
      </Link>
      <Link
        href={`/courses/${cid}/quizzes`}
        id={includeIds ? "wd-course-quizzes-link" : undefined}
        className={`list-group-item border-0 ${isQuizzes ? "active" : "text-danger"}`}
        onClick={onNavigate}
      >
        Quizzes
      </Link>
      <Link
        href={`/courses/${cid}/grades`}
        id={includeIds ? "wd-course-grades-link" : undefined}
        className={`list-group-item border-0 ${isGrades ? "active" : "text-danger"}`}
        onClick={onNavigate}
      >
        Grades
      </Link>
      <Link
        href={`/courses/${cid}/people/table`}
        id={includeIds ? "wd-course-people-link" : undefined}
        className={`list-group-item border-0 ${isPeople ? "active" : "text-danger"}`}
        onClick={onNavigate}
      >
        People
      </Link>
    </div>
  );
}
