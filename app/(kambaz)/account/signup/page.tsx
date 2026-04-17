"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { UserRole } from "../../database";
import { useAppDispatch } from "../../hooks";
import { setCurrentUser } from "../reducer";
import { setCourses } from "../../courses/reducer";
import * as client from "../client";

export default function Signup() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    username: "",
    password: "",
    verifyPassword: "",
    role: "STUDENT" as UserRole,
  });
  const [error, setError] = useState("");

  const setField = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const signup = async () => {
    if (form.password !== form.verifyPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const user = await client.signup({
        username: form.username,
        password: form.password,
        firstName: form.username,
        lastName: "User",
        email: `${form.username}@example.com`,
        dob: "2000-01-01",
        role: form.role,
        loginId: form.username,
        section: "S101",
        lastActivity: new Date().toISOString().split("T")[0],
        totalActivity: "0:00:00",
      });
      dispatch(setCurrentUser(user));
      dispatch(setCourses([]));
      router.push("/dashboard");
    } catch {
      setError("Unable to sign up. Try a different username.");
    }
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={form.username}
        onChange={(event) => setField("username", event.currentTarget.value)}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={form.password}
        onChange={(event) => setField("password", event.currentTarget.value)}
      />
      <FormControl
        id="wd-verify-password"
        placeholder="verify password"
        type="password"
        className="mb-2"
        value={form.verifyPassword}
        onChange={(event) =>
          setField("verifyPassword", event.currentTarget.value)
        }
      />
      <FormSelect
        className="mb-2"
        value={form.role}
        onChange={(event) => setField("role", event.currentTarget.value)}
      >
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
      </FormSelect>
      {error && <div className="text-danger small mb-2">{error}</div>}
      <Button id="wd-signup-btn" className="w-100 mb-2" onClick={signup}>
        Sign up
      </Button>
      <br />
      <Link id="wd-signin-link" href="/account/signin">
        Sign in
      </Link>
    </div>
  );
}
