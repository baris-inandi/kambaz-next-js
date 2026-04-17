"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { setCurrentUser } from "./reducer";
import * as accountClient from "./client";
import * as coursesClient from "../courses/client";
import { setCourses } from "../courses/reducer";

interface Props {
  children: ReactNode;
}

export default function Session({ children }: Props) {
  const dispatch = useAppDispatch();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const currentUser = await accountClient.profile();
        dispatch(setCurrentUser(currentUser));
        const courses = await coursesClient.findMyCourses();
        dispatch(setCourses(courses));
      } catch {
        dispatch(setCurrentUser(null));
        dispatch(setCourses([]));
      } finally {
        setPending(false);
      }
    };

    fetchSession();
  }, [dispatch]);

  if (pending) {
    return null;
  }

  return children;
}
