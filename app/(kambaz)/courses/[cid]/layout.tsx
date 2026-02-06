import { ReactNode } from "react";
import CourseShell from "./CourseShell";

interface Props {
  children: ReactNode;
  params: Promise<{ cid: string }>;
}

export default async function CoursesLayout(props: Props) {
  const { cid } = await props.params;
  return <CourseShell cid={cid}>{props.children}</CourseShell>;
}
