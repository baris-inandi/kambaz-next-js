"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../hooks";

export default function AccountPage() {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.accountReducer);

  useEffect(() => {
    router.replace(currentUser ? "/account/profile" : "/account/signin");
  }, [currentUser, router]);

  return null;
}
