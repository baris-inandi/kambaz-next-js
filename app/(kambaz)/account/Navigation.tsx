"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  const isSignin = pathname === "/account/signin";
  const isSignup = pathname === "/account/signup";
  const isProfile = pathname === "/account/profile";

  return (
    <div id="wd-account-navigation" className="wd list-group rounded-0 fs-5">
      <Link
        href="/account/signin"
        className={`list-group-item border-0 ${isSignin ? "active" : "text-danger"}`}
      >
        Signin
      </Link>
      <Link
        href="/account/signup"
        className={`list-group-item border-0 ${isSignup ? "active" : "text-danger"}`}
      >
        Signup
      </Link>
      <Link
        href="/account/profile"
        className={`list-group-item border-0 ${isProfile ? "active" : "text-danger"}`}
      >
        Profile
      </Link>
    </div>
  );
}
