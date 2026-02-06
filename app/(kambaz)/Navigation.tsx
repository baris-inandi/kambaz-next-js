"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaFlask, FaInbox } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";

interface Props {
  variant?: "desktop" | "mobile";
  includeIds?: boolean;
  onNavigate?: () => void;
}

export default function KambazNavigation({
  variant = "desktop",
  includeIds = true,
  onNavigate,
}: Props) {
  const pathname = usePathname();

  const isAccount = pathname.startsWith("/account");
  const isDashboard = pathname === "/dashboard";
  const isCourses = pathname.startsWith("/courses");
  const isCalendar = pathname.startsWith("/calendar");
  const isInbox = pathname.startsWith("/inbox");
  const isLabs = pathname.startsWith("/labs");

  const rootClasses =
    variant === "desktop"
      ? "rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      : "rounded-0 bg-black border-0 h-100";

  return (
    <ListGroup
      className={rootClasses}
      style={{ width: 120 }}
      id={includeIds ? "wd-kambaz-navigation" : undefined}
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id={includeIds ? "wd-neu-link" : undefined}
      >
        <img
          src="/images/northeastern.jpg"
          width="75px"
          alt="Northeastern University"
        />
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${isAccount ? "bg-white" : "bg-black"}`}
      >
        <Link
          href="/account"
          id={includeIds ? "wd-account-link" : undefined}
          className={`${isAccount ? "text-danger" : "text-white"} text-decoration-none`}
          onClick={onNavigate}
        >
          <FaRegCircleUser
            className={`fs-1 ${isAccount ? "text-danger" : "text-white"}`}
          />
          <br />
          Account
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${isDashboard ? "bg-white" : "bg-black"}`}
      >
        <Link
          href="/dashboard"
          id={includeIds ? "wd-dashboard-link" : undefined}
          className={`${isDashboard ? "text-danger" : "text-white"} text-decoration-none`}
          onClick={onNavigate}
        >
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${isCourses ? "bg-white" : "bg-black"}`}
      >
        <Link
          href="/courses/1234/home"
          id={includeIds ? "wd-course-link" : undefined}
          className={`${isCourses ? "text-danger" : "text-white"} text-decoration-none`}
          onClick={onNavigate}
        >
          <LiaBookSolid className="fs-1 text-danger" />
          <br />
          Courses
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${isCalendar ? "bg-white" : "bg-black"}`}
      >
        <Link
          href="/calendar"
          id={includeIds ? "wd-calendar-link" : undefined}
          className={`${isCalendar ? "text-danger" : "text-white"} text-decoration-none`}
          onClick={onNavigate}
        >
          <IoCalendarOutline className="fs-1 text-danger" />
          <br />
          Calendar
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${isInbox ? "bg-white" : "bg-black"}`}
      >
        <Link
          href="/inbox"
          id={includeIds ? "wd-inbox-link" : undefined}
          className={`${isInbox ? "text-danger" : "text-white"} text-decoration-none`}
          onClick={onNavigate}
        >
          <FaInbox className="fs-1 text-danger" />
          <br />
          Inbox
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${isLabs ? "bg-white" : "bg-black"}`}
      >
        <Link
          href="/labs"
          id={includeIds ? "wd-labs-link" : undefined}
          className={`${isLabs ? "text-danger" : "text-white"} text-decoration-none`}
          onClick={onNavigate}
        >
          <FaFlask className="fs-1 text-danger" />
          <br />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
