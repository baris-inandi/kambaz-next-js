import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "react-bootstrap";

const courses = [
  {
    id: "1234",
    title: "CS1234 React JS",
    description: "Full Stack software developer",
  },
  {
    id: "5678",
    title: "CS5678 Node.js",
    description: "Server-side JavaScript development",
  },
  {
    id: "9012",
    title: "CS9012 MongoDB",
    description: "Database management and design",
  },
  {
    id: "3456",
    title: "CS3456 TypeScript",
    description: "Type-safe JavaScript development",
  },
  {
    id: "7890",
    title: "CS7890 Express.js",
    description: "Web application framework",
  },
  {
    id: "2468",
    title: "CS2468 Next.js",
    description: "React framework for production",
  },
  {
    id: "1357",
    title: "CS1357 Web Development",
    description: "Complete web development course",
  },
];

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row
          xs={1}
          md={5}
          className="g-0"
          style={{ rowGap: "32px", columnGap: "30px" }}
        >
          {courses.map((course) => (
            <Col
              className="wd-dashboard-course"
              style={{ width: "300px" }}
              key={course.id}
            >
              <Card>
                <Link
                  href="/courses/1234/home"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src="/images/reactjs.jpg"
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.title}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
