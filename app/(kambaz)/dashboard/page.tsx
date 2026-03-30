"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
import { Course } from "../database";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setCourses } from "../courses/reducer";
import * as client from "../courses/client";

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
  const [course, setCourse] = useState<Course>(emptyCourse);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
    }
  }, [currentUser, router]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!currentUser) {
        return;
      }
      try {
        const myCourses = await client.findMyCourses();
        dispatch(setCourses(myCourses));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [currentUser, dispatch]);

  useEffect(() => {
    const fetchAllCourses = async () => {
      if (!showAllCourses || !currentUser) {
        return;
      }
      try {
        const availableCourses = await client.fetchAllCourses();
        setAllCourses(availableCourses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllCourses();
  }, [currentUser, showAllCourses]);

  const isFaculty = currentUser?.role === "FACULTY";
  const enrolledCourseIds = useMemo(
    () => new Set(courses.map((listedCourse) => listedCourse._id)),
    [courses],
  );

  const displayedCourses = useMemo(
    () => (showAllCourses ? allCourses : courses),
    [allCourses, courses, showAllCourses],
  );

  if (!currentUser) {
    return null;
  }

  const setCourseField = (key: keyof Course, value: string) => {
    setCourse({ ...course, [key]: value });
  };

  const resetForm = () => setCourse(emptyCourse);

  const handleAddCourse = async () => {
    const newCourse: Course = {
      ...course,
      number: course.number || "New Course Number",
      name: course.name || "New Course",
      description: course.description || "New course description",
      image: course.image || "/images/reactjs.jpg",
    };
    const createdCourse = await client.createCourse(newCourse);
    dispatch(setCourses([...courses, createdCourse]));
    setAllCourses((current) => [...current, createdCourse]);
    resetForm();
  };

  const handleUpdateCourse = async () => {
    if (!course._id) {
      return;
    }
    const updatedCourse = {
      ...course,
      image: course.image || "/images/reactjs.jpg",
    };
    await client.updateCourse(updatedCourse);
    dispatch(
      setCourses(
        courses.map((listedCourse) =>
          listedCourse._id === updatedCourse._id ? updatedCourse : listedCourse,
        ),
      ),
    );
    setAllCourses((current) =>
      current.map((listedCourse) =>
        listedCourse._id === updatedCourse._id ? updatedCourse : listedCourse,
      ),
    );
    resetForm();
  };

  const handleEditCourse = (selectedCourse: Course) => {
    setCourse(selectedCourse);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(
      setCourses(
        courses.filter((listedCourse) => listedCourse._id !== courseId),
      ),
    );
    setAllCourses((current) =>
      current.filter((listedCourse) => listedCourse._id !== courseId),
    );
    if (course._id === courseId) {
      resetForm();
    }
  };

  const handleToggleEnrollment = async (courseId: string) => {
    const isEnrolled = enrolledCourseIds.has(courseId);
    if (isEnrolled) {
      await client.unenrollFromCourse(courseId);
    } else {
      await client.enrollInCourse(courseId);
    }
    const myCourses = await client.findMyCourses();
    dispatch(setCourses(myCourses));
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
            onChange={(event) =>
              setCourseField("name", event.currentTarget.value)
            }
            className="mb-2"
            placeholder="Course Name"
            id="wd-course-name"
          />
          <FormControl
            value={course.description}
            onChange={(event) =>
              setCourseField("description", event.currentTarget.value)
            }
            className="mb-2"
            placeholder="Course Description"
            id="wd-course-description"
          />
          <FormControl
            value={course.number}
            onChange={(event) =>
              setCourseField("number", event.currentTarget.value)
            }
            className="mb-2"
            placeholder="Course Number"
            id="wd-course-number"
          />
          <FormControl
            value={course.startDate}
            onChange={(event) =>
              setCourseField("startDate", event.currentTarget.value)
            }
            className="mb-2"
            type="date"
            id="wd-course-start-date"
          />
          <FormControl
            value={course.endDate}
            onChange={(event) =>
              setCourseField("endDate", event.currentTarget.value)
            }
            className="mb-2"
            type="date"
            id="wd-course-end-date"
          />
          <FormControl
            value={course.image}
            onChange={(event) =>
              setCourseField("image", event.currentTarget.value)
            }
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
                            onClick={() =>
                              void handleDeleteCourse(listedCourse._id)
                            }
                          >
                            Delete
                          </Button>
                        </>
                      )}
                      {showAllCourses && (
                        <Button
                          variant={isEnrolled ? "danger" : "success"}
                          onClick={() =>
                            void handleToggleEnrollment(listedCourse._id)
                          }
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
