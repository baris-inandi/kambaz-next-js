"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "../hooks";

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const links = currentUser
    ? [
        { label: "Profile", href: "/account/profile" },
        ...(currentUser.role === "ADMIN"
          ? [{ label: "Users", href: "/account/users" }]
          : []),
      ]
    : [
        { label: "Signin", href: "/account/signin" },
        { label: "Signup", href: "/account/signup" },
      ];

  return (
    <div id="wd-account-navigation" className="wd list-group rounded-0 fs-5">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`list-group-item border-0 ${pathname.startsWith(link.href) ? "active" : "text-danger"}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
