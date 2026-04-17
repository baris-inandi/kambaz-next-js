"use client";

import Link from "next/link";
import { CSSProperties } from "react";

interface Props {
  cid: string;
  courseLabel: string;
  currentUserName: string;
  activeTab: "qa" | "manage";
  showManageClass?: boolean;
  fixedStyle?: CSSProperties;
  children?: React.ReactNode;
}

export default function PazzaHeader({
  cid,
  courseLabel,
  currentUserName,
  activeTab,
  showManageClass = false,
  fixedStyle,
  children,
}: Props) {
  return (
    <div className="wd-pazza-fixed-shell" style={fixedStyle}>
      <div className="wd-pazza-nav border rounded-top-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div className="wd-pazza-logo">pazza</div>
            <div className="fw-semibold">{courseLabel}</div>
            <nav className="d-flex gap-3">
              <Link
                href={`/courses/${cid}/pazza`}
                className={`wd-pazza-tab ${activeTab === "qa" ? "active" : ""}`}
              >
                Q&amp;A
              </Link>
              {showManageClass && (
                <Link
                  href={`/courses/${cid}/pazza/manage-class`}
                  className={`wd-pazza-tab ${activeTab === "manage" ? "active" : ""}`}
                >
                  Manage Class
                </Link>
              )}
            </nav>
          </div>
          <div className="text-secondary">{currentUserName}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
