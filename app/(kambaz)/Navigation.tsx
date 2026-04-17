"use client";

import Image from "next/image";
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
  const links = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: AiOutlineDashboard,
      id: "wd-dashboard-link",
      active: pathname === "/dashboard",
    },
    {
      label: "Courses",
      path: "/dashboard",
      icon: LiaBookSolid,
      id: "wd-course-link",
      active: pathname.startsWith("/courses"),
    },
    {
      label: "Calendar",
      path: "/calendar",
      icon: IoCalendarOutline,
      id: "wd-calendar-link",
      active: pathname.startsWith("/calendar"),
    },
    {
      label: "Inbox",
      path: "/inbox",
      icon: FaInbox,
      id: "wd-inbox-link",
      active: pathname.startsWith("/inbox"),
    },
    {
      label: "Labs",
      path: "/labs",
      icon: FaFlask,
      id: "wd-labs-link",
      active: pathname.startsWith("/labs"),
    },
  ];

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
        <Image
          src="/images/northeastern.jpg"
          width={75}
          height={75}
          alt="Northeastern University"
        />
      </ListGroupItem>

      <ListGroupItem className="border-0 text-center bg-black">
        <Link
          href="/account"
          id={includeIds ? "wd-account-link" : undefined}
          className="text-white text-decoration-none"
          onClick={onNavigate}
        >
          <FaRegCircleUser className="fs-1 text-white" />
          <br />
          Account
        </Link>
      </ListGroupItem>

      {links.map((link) => {
        const Icon = link.icon;
        return (
          <ListGroupItem
            key={link.label}
            className={`border-0 text-center ${link.active ? "bg-white" : "bg-black"}`}
          >
            <Link
              href={link.path}
              id={includeIds ? link.id : undefined}
              className={`${link.active ? "text-danger" : "text-white"} text-decoration-none`}
              onClick={onNavigate}
            >
              <Icon className="fs-1 text-danger" />
              <br />
              {link.label}
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
