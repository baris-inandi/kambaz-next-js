"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaAlignJustify, FaXmark } from "react-icons/fa6";
import KambazNavigation from "../../Navigation";
import CourseNavigation from "./Navigation";

interface Props {
  cid: string;
  children: ReactNode;
}

export default function CourseShell({ cid, children }: Props) {
  const pathname = usePathname();
  const [showKambazNavigation, setShowKambazNavigation] = useState(false);
  const [showCourseNavigation, setShowCourseNavigation] = useState(false);

  const closeMenus = () => {
    setShowKambazNavigation(false);
    setShowCourseNavigation(false);
  };

  const openKambazMenu = () => {
    setShowCourseNavigation(false);
    setShowKambazNavigation(true);
  };

  const openCourseMenu = () => {
    setShowKambazNavigation(false);
    setShowCourseNavigation(true);
  };

  useEffect(() => {
    closeMenus();
  }, [pathname]);

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
        <h2 className="text-danger m-0 fs-5">Course {cid}</h2>
        <button
          id="wd-show-course-navigation"
          className="btn btn-link text-danger p-0"
          onClick={openCourseMenu}
          aria-label="Show Course Navigation"
        >
          <FaAlignJustify className="fs-4" />
        </button>
      </div>

      <h2 className="text-danger d-none d-md-block">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        Course {cid}
      </h2>
      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation cid={cid} />
        </div>
        <div className="flex-fill">{children}</div>
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

      {showCourseNavigation && (
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
