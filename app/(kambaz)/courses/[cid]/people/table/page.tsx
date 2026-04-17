"use client";

import { startTransition, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User } from "../../../../database";
import SharedPeopleTable from "../../../../people/PeopleTable";
import * as client from "../../../client";

export default function CoursePeoplePage() {
  const { cid } = useParams<{ cid: string }>();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    if (!cid) {
      return;
    }
    const nextUsers = await client.findUsersForCourse(cid);
    startTransition(() => {
      setUsers(nextUsers);
    });
  };

  useEffect(() => {
    if (!cid) {
      return;
    }

    let cancelled = false;

    const loadUsers = async () => {
      const nextUsers = await client.findUsersForCourse(cid);
      if (!cancelled) {
        startTransition(() => {
          setUsers(nextUsers);
        });
      }
    };

    void loadUsers();
    return () => {
      cancelled = true;
    };
  }, [cid]);

  return (
    <SharedPeopleTable users={users} fetchUsers={fetchUsers} canEdit={false} />
  );
}
