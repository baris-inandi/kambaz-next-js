"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import * as accountClient from "../client";
import { User, UserRole } from "../../database";
import { useAppSelector } from "../../hooks";
import PeopleTable from "../../people/PeopleTable";

export default function UsersPage() {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState<"" | UserRole>("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
      return;
    }
    if (currentUser.role !== "ADMIN") {
      router.replace("/account/profile");
    }
  }, [currentUser, router]);

  const fetchUsers = async () => {
    let nextUsers: User[] = [];

    if (name.trim()) {
      nextUsers = await accountClient.findUsersByPartialName(name.trim());
    } else if (role) {
      nextUsers = await accountClient.findUsersByRole(role);
    } else {
      nextUsers = await accountClient.findAllUsers();
    }

    startTransition(() => {
      setUsers(nextUsers);
    });
  };

  useEffect(() => {
    if (currentUser?.role !== "ADMIN") {
      return;
    }

    let cancelled = false;

    const loadUsers = async () => {
      let nextUsers: User[] = [];

      if (name.trim()) {
        nextUsers = await accountClient.findUsersByPartialName(name.trim());
      } else if (role) {
        nextUsers = await accountClient.findUsersByRole(role);
      } else {
        nextUsers = await accountClient.findAllUsers();
      }

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
  }, [currentUser, role, name]);

  if (!currentUser || currentUser.role !== "ADMIN") {
    return null;
  }

  const createUser = async () => {
    const suffix = Date.now().toString();
    await accountClient.createUser({
      firstName: "New",
      lastName: "User",
      loginId: suffix,
      username: `new.user.${suffix}`,
      password: "123",
      email: `new.user.${suffix}@neu.edu`,
      dob: "2000-01-01",
      section: "S101",
      role: "STUDENT",
      lastActivity: new Date().toISOString().slice(0, 10),
      totalActivity: "00:00:00",
    });
    await fetchUsers();
  };

  return (
    <div id="wd-users-screen">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Users</h1>
        <Button id="wd-add-user" onClick={() => void createUser()}>
          + People
        </Button>
      </div>

      <div className="d-flex gap-2 mb-3">
        <FormSelect
          id="wd-filter-role"
          value={role}
          onChange={(event) =>
            setRole((event.currentTarget.value || "") as "" | UserRole)
          }
        >
          <option value="">All Roles</option>
          <option value="ADMIN">ADMIN</option>
          <option value="FACULTY">FACULTY</option>
          <option value="STUDENT">STUDENT</option>
          <option value="TA">TA</option>
        </FormSelect>
        <FormControl
          id="wd-filter-name"
          value={name}
          placeholder="Filter by name"
          onChange={(event) => setName(event.currentTarget.value)}
        />
      </div>

      <PeopleTable users={users} fetchUsers={fetchUsers} canEdit />
    </div>
  );
}
