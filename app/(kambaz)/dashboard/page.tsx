"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Course } from "../database";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  dropEnrollmentsForCourse,
  enroll,
  unenroll,
} from "../enrollments/reducer";

const emptyCourse: Course = {
  _id: "",
  number: "",
  name: "",
  description: "",
  startDate: "2024-01-10",
  endDate: "2024-05-15",
  image: "/images/reactjs.jpg",
};

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const { enrollments } = useAppSelector((state) => state.enrollmentsReducer);
  const [course, setCourse] = useState<Course>(emptyCourse);
  const [showAllCourses, setShowAllCourses] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
    }
  }, [currentUser, router]);

  const isFaculty = currentUser?.role === "FACULTY";
  const enrolledCourseIds = useMemo(
    () =>
      new Set(
        enrollments
          .filter((enrollment) => enrollment.user === currentUser?._id)
          .map((enrollment) => enrollment.course),
      ),
    [currentUser?._id, enrollments],
  );

  const displayedCourses = useMemo(
    () =>
      showAllCourses
        ? courses
        : courses.filter((item) => enrolledCourseIds.has(item._id)),
    [courses, enrolledCourseIds, showAllCourses],
  );

  if (!currentUser) {
    return null;
  }

  const updateField =
    (key: keyof Course) => (event: ChangeEvent<HTMLInputElement>) => {
      setCourse({ ...course, [key]: event.target.value });
    };

  const resetForm = () => setCourse(emptyCourse);

  const handleAddCourse = () => {
    const newCourse: Course = {
      ...course,
      _id: uuidv4(),
      number: course.number || "New Course Number",
      name: course.name || "New Course",
      description: course.description || "New course description",
      image: course.image || "/images/reactjs.jpg",
    };
    dispatch(addNewCourse(newCourse));
    if (isFaculty) {
      dispatch(
        enroll({
          _id: uuidv4(),
          user: currentUser._id,
          course: newCourse._id,
        }),
      );
    }
    resetForm();
  };

  const handleUpdateCourse = () => {
    if (!course._id) {
      return;
    }
    dispatch(
      updateCourse({
        ...course,
        image: course.image || "/images/reactjs.jpg",
      }),
    );
    resetForm();
  };

  const handleEditCourse = (selectedCourse: Course) => {
    setCourse(selectedCourse);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteCourse = (courseId: string) => {
    dispatch(deleteCourse(courseId));
    dispatch(dropEnrollmentsForCourse(courseId));
    if (course._id === courseId) {
      resetForm();
    }
  };

  const handleToggleEnrollment = (courseId: string) => {
    const isEnrolled = enrolledCourseIds.has(courseId);
    if (isEnrolled) {
      dispatch(unenroll({ user: currentUser._id, course: courseId }));
      return;
    }

    dispatch(
      enroll({
        _id: uuidv4(),
        user: currentUser._id,
        course: courseId,
      }),
    );
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {isFaculty && (
        <div id="wd-dashboard-course-editor" className="mb-4">
          <h2 className="fs-4">Course Editor</h2>
          <FormControl
            value={course.name}
            onChange={updateField("name")}
            className="mb-2"
            placeholder="Course Name"
            id="wd-course-name"
          />
          <FormControl
            value={course.description}
            onChange={updateField("description")}
            className="mb-2"
            placeholder="Course Description"
            id="wd-course-description"
          />
          <FormControl
            value={course.number}
            onChange={updateField("number")}
            className="mb-2"
            placeholder="Course Number"
            id="wd-course-number"
          />
          <FormControl
            value={course.startDate}
            onChange={updateField("startDate")}
            className="mb-2"
            type="date"
            id="wd-course-start-date"
          />
          <FormControl
            value={course.endDate}
            onChange={updateField("endDate")}
            className="mb-2"
            type="date"
            id="wd-course-end-date"
          />
          <FormControl
            value={course.image}
            onChange={updateField("image")}
            className="mb-2"
            placeholder="Course Image URL"
            id="wd-course-image"
          />
          <div className="d-flex gap-2">
            <Button
              id="wd-add-new-course-click"
              variant="danger"
              onClick={handleAddCourse}
            >
              Add
            </Button>
            <Button
              id="wd-update-course-click"
              variant="primary"
              onClick={handleUpdateCourse}
              disabled={!course._id}
            >
              Update
            </Button>
            <Button variant="secondary" onClick={resetForm}>
              Clear
            </Button>
          </div>
          <hr />
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center">
        <h2 id="wd-dashboard-published">
          Published Courses ({displayedCourses.length})
        </h2>
        <Button
          id="wd-dashboard-enrollments"
          variant="primary"
          onClick={() => setShowAllCourses((current) => !current)}
        >
          Enrollments
        </Button>
      </div>
      <hr />
      <div id="wd-dashboard-courses">
        <Row
          xs={1}
          md={5}
          className="g-0"
          style={{ rowGap: "32px", columnGap: "30px" }}
        >
          {displayedCourses.map((listedCourse) => {
            const isEnrolled = enrolledCourseIds.has(listedCourse._id);
            return (
              <Col
                className="wd-dashboard-course"
                style={{ width: "300px" }}
                key={listedCourse._id}
              >
                <Card>
                  <Link
                    href={`/courses/${listedCourse._id}/home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      variant="top"
                      src={listedCourse.image || "/images/reactjs.jpg"}
                      style={{ height: "160px", objectFit: "cover" }}
                    />
                  </Link>
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {listedCourse.number} {listedCourse.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {listedCourse.description}
                    </CardText>
                    <div className="d-flex flex-wrap gap-2">
                      <Link
                        href={`/courses/${listedCourse._id}/home`}
                        className="btn btn-primary"
                      >
                        Go
                      </Link>
                      {isFaculty && (
                        <>
                          <Button
                            variant="warning"
                            onClick={() => handleEditCourse(listedCourse)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteCourse(listedCourse._id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                      {showAllCourses && (
                        <Button
                          variant={isEnrolled ? "danger" : "success"}
                          onClick={() => handleToggleEnrollment(listedCourse._id)}
                        >
                          {isEnrolled ? "Unenroll" : "Enroll"}
                        </Button>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
