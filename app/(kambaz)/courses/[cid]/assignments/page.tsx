import Link from "next/link";

interface Props {
  params: Promise<{ cid: string }>;
}

export default async function Assignments(props: Props) {
  const { cid } = await props.params;
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/123`}
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/124`}
            className="wd-assignment-link"
          >
            A2 - CSS
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/125`}
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/126`}
            className="wd-assignment-link"
          >
            A4 - REDUX
          </Link>
        </li>
      </ul>
      <h3 id="wd-quizzes-title">
        QUIZZES 10% of Total <button>+</button>
      </h3>
      <ul id="wd-quiz-list">
        <li className="wd-quiz-list-item">
          <Link href={`/courses/${cid}/quizzes`} className="wd-quiz-link">
            Q1 - HTML Basics
          </Link>
        </li>
        <li className="wd-quiz-list-item">
          <Link href={`/courses/${cid}/quizzes`} className="wd-quiz-link">
            Q2 - CSS Fundamentals
          </Link>
        </li>
      </ul>
      <h3 id="wd-exams-title">
        EXAMS 20% of Total <button>+</button>
      </h3>
      <ul id="wd-exam-list">
        <li className="wd-exam-list-item">
          <Link href={`/courses/${cid}/quizzes`} className="wd-exam-link">
            Midterm
          </Link>
        </li>
        <li className="wd-exam-list-item">
          <Link href={`/courses/${cid}/quizzes`} className="wd-exam-link">
            Final
          </Link>
        </li>
      </ul>
      <h3 id="wd-project-title">
        PROJECT 30% of Total <button>+</button>
      </h3>
      <ul id="wd-project-list">
        <li className="wd-project-list-item">
          <Link
            href={`/courses/${cid}/assignments/127`}
            className="wd-project-link"
          >
            Final Project
          </Link>
        </li>
      </ul>
    </div>
  );
}
