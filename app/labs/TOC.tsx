"use client";

import Link from "next/link";
import { Nav, NavItem, NavLink } from "react-bootstrap";

export default function TOC() {
  return (
    <Nav variant="pills" className="flex-column">
      <NavItem>
        <NavLink href="/labs" as={Link} id="wd-home-link">
          Labs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/labs/lab1" as={Link} id="wd-lab1-link">
          Lab 1
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/labs/lab2" as={Link} id="wd-lab2-link">
          Lab 2
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/labs/lab3" as={Link} id="wd-lab3-link">
          Lab 3
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
        >
          My GitHub
        </NavLink>
      </NavItem>
    </Nav>
  );
}
