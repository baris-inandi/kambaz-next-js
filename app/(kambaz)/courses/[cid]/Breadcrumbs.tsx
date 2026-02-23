"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb } from "react-bootstrap";
import * as db from "../../database";

interface Props {
  cid: string;
}

export default function CourseBreadcrumbs({ cid }: Props) {
  const pathname = usePathname();
  const course = db.courses.find((c) => c._id === cid);

  const segments = pathname.split("/").filter(Boolean);
  const section = segments[2] || "home";
  const aid = segments[3];

  const sectionLabelMap: Record<string, string> = {
    home: "Home",
    modules: "Modules",
    assignments: "Assignments",
  };

  const sectionLabel = sectionLabelMap[section] || "Home";
  const assignment = aid
    ? db.assignments.find((item) => item._id === aid && item.course === cid)
    : undefined;

  return (
    <Breadcrumb id="wd-course-breadcrumbs" className="mb-3">
      <Breadcrumb.Item active>Courses</Breadcrumb.Item>
      <Breadcrumb.Item active>{course?.name || cid}</Breadcrumb.Item>
      <Breadcrumb.Item active>{sectionLabel}</Breadcrumb.Item>
      {assignment && (
        <Breadcrumb.Item active>{assignment.title}</Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}
