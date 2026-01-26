import Link from "next/link";

interface Props {
  cid: string;
}

export default function CourseNavigation(props: Props) {
  return (
    <div id="wd-courses-navigation">
      <Link href={`/courses/${props.cid}/home`} id="wd-course-home-link">
        Home
      </Link>
      <br />
      <Link href={`/courses/${props.cid}/modules`} id="wd-course-modules-link">
        Modules
      </Link>
      <br />
      <Link href={`/courses/${props.cid}/piazza`} id="wd-course-piazza-link">
        Piazza
      </Link>
      <br />
      <Link href={`/courses/${props.cid}/zoom`} id="wd-course-zoom-link">
        Zoom
      </Link>
      <br />
      <Link
        href={`/courses/${props.cid}/assignments`}
        id="wd-course-assignments-link"
      >
        Assignments
      </Link>
      <br />
      <Link href={`/courses/${props.cid}/quizzes`} id="wd-course-quizzes-link">
        Quizzes
      </Link>
      <br />
      <Link href={`/courses/${props.cid}/grades`} id="wd-course-grades-link">
        Grades
      </Link>
      <br />
      <Link
        href={`/courses/${props.cid}/people/table`}
        id="wd-course-people-link"
      >
        People
      </Link>
      <br />
    </div>
  );
}
