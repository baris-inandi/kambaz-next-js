"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaAlignJustify, FaXmark } from "react-icons/fa6";
import KambazNavigation from "../../Navigation";
import { useAppSelector } from "../../hooks";
import CourseBreadcrumbs from "./Breadcrumbs";
import CourseNavigation from "./Navigation";

interface Props {
  cid: string;
  children: ReactNode;
}

export default function CourseShell({ cid, children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [showKambazNavigation, setShowKambazNavigation] = useState(false);
  const [showMobileCourseNavigation, setShowMobileCourseNavigation] =
    useState(false);
  const [showDesktopCourseNavigation, setShowDesktopCourseNavigation] =
    useState(true);
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const course = courses.find((item) => item._id === cid);
  const hasAccess = !!course && !!currentUser;
  const courseLabel = course
    ? `${course.number ? `${course.number} ` : ""}${course.name}`
    : cid;
  const showBreadcrumbs =
    pathname.startsWith(`/courses/${cid}/home`) ||
    pathname.startsWith(`/courses/${cid}/modules`) ||
    pathname.startsWith(`/courses/${cid}/assignments`);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
      return;
    }

    if (!course) {
      router.replace("/dashboard");
    }
  }, [course, currentUser, router]);

  const closeMenus = () => {
    setShowKambazNavigation(false);
    setShowMobileCourseNavigation(false);
  };

  const openKambazMenu = () => {
    setShowMobileCourseNavigation(false);
    setShowKambazNavigation(true);
  };

  const openCourseMenu = () => {
    setShowKambazNavigation(false);
    setShowMobileCourseNavigation(true);
  };

  if (!hasAccess) {
    return null;
  }

  return (
    <div id="wd-courses">
      <div className="d-md-none d-flex justify-content-between align-items-center mb-2">
        <button
          id="wd-show-kambaz-navigation"
          className="btn btn-link text-danger p-0"
          onClick={openKambazMenu}
          aria-label="Show Kambaz Navigation"
        >
          <FaAlignJustify className="fs-4" />
        </button>
        <h2 className="text-danger m-0 fs-5">{courseLabel}</h2>
        <button
          id="wd-show-course-navigation"
          className="btn btn-link text-danger p-0"
          onClick={openCourseMenu}
          aria-label="Show Course Navigation"
        >
          <FaAlignJustify className="fs-4" />
        </button>
      </div>

      <h2 className="text-danger d-none d-md-flex align-items-center">
        <button
          className="btn btn-link text-danger p-0 me-4"
          onClick={() => setShowDesktopCourseNavigation((current) => !current)}
          aria-label="Toggle Course Navigation"
        >
          <FaAlignJustify className="fs-4 mb-1" />
        </button>
        {courseLabel}
      </h2>
      <hr />

      <div className="d-flex">
        {showDesktopCourseNavigation && (
          <div className="d-none d-md-block">
            <CourseNavigation cid={cid} />
          </div>
        )}
        <div className="flex-fill">
          {showBreadcrumbs && <CourseBreadcrumbs cid={cid} />}
          {children}
        </div>
      </div>

      {showKambazNavigation && (
        <>
          <button
            className="btn position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 border-0 rounded-0 d-md-none"
            onClick={closeMenus}
            aria-label="Close Kambaz Navigation"
            style={{ zIndex: 1035 }}
          />
          <aside
            className="position-fixed top-0 bottom-0 start-0 bg-black d-md-none"
            style={{ width: "120px", zIndex: 1036 }}
          >
            <div className="text-end p-2">
              <button
                className="btn btn-link text-white p-0"
                onClick={closeMenus}
                aria-label="Close Kambaz Navigation Menu"
              >
                <FaXmark className="fs-4" />
              </button>
            </div>
            <KambazNavigation
              variant="mobile"
              includeIds={false}
              onNavigate={closeMenus}
            />
          </aside>
        </>
      )}

      {showMobileCourseNavigation && (
        <>
          <button
            className="btn position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 border-0 rounded-0 d-md-none"
            onClick={closeMenus}
            aria-label="Close Course Navigation"
            style={{ zIndex: 1035 }}
          />
          <aside
            className="position-fixed top-0 bottom-0 end-0 bg-white border-start d-md-none p-2"
            style={{ width: "260px", zIndex: 1036 }}
          >
            <div className="d-flex justify-content-end mb-2">
              <button
                className="btn btn-link text-dark p-0"
                onClick={closeMenus}
                aria-label="Close Course Navigation Menu"
              >
                <FaXmark className="fs-4" />
              </button>
            </div>
            <CourseNavigation
              cid={cid}
              variant="mobile"
              includeIds={false}
              onNavigate={closeMenus}
            />
          </aside>
        </>
      )}
    </div>
  );
}
