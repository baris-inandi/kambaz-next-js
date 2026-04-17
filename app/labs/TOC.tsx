"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";

export default function TOC() {
  const pathname = usePathname();
  const serverUrl = process.env.NEXT_PUBLIC_HTTP_SERVER;

  return (
    <Nav variant="pills" className="flex-column">
      <NavItem>
        <NavLink
          href="/labs/lab1"
          as={Link}
          id="wd-home-link"
          className={`nav-link ${
            pathname === "/labs" || pathname.startsWith("/labs/lab1")
              ? "active"
              : ""
          }`}
        >
          Labs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/labs/lab1"
          as={Link}
          id="wd-lab1-link"
          className={`nav-link ${pathname.startsWith("/labs/lab1") ? "active" : ""}`}
        >
          Lab 1
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/labs/lab2"
          as={Link}
          id="wd-lab2-link"
          className={`nav-link ${pathname.startsWith("/labs/lab2") ? "active" : ""}`}
        >
          Lab 2
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/labs/lab3"
          as={Link}
          id="wd-lab3-link"
          className={`nav-link ${pathname.startsWith("/labs/lab3") ? "active" : ""}`}
        >
          Lab 3
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/labs/lab4"
          as={Link}
          id="wd-lab4-link"
          className={`nav-link ${pathname.startsWith("/labs/lab4") ? "active" : ""}`}
        >
          Lab 4
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/labs/lab5"
          as={Link}
          id="wd-lab5-link"
          className={`nav-link ${pathname.startsWith("/labs/lab5") ? "active" : ""}`}
        >
          Lab 5
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/" as={Link} id="wd-kambaz-link">
          Kambaz
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="https://github.com/baris-inandi/kambaz-next-js"
          id="wd-github-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Client GitHub
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="https://github.com/baris-inandi/kambaz-node-server-app"
          id="wd-server-github-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Server GitHub
        </NavLink>
      </NavItem>
      {serverUrl && (
        <NavItem>
          <NavLink
            href={serverUrl}
            id="wd-server-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deployed Server
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
}
