"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useAppDispatch } from "../../hooks";
import { setCurrentUser } from "../reducer";
import { setCourses } from "../../courses/reducer";
import * as client from "../client";
import * as coursesClient from "../../courses/client";

export default function Signin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const sampleUsers = [
    { role: "Faculty", username: "jose", password: "123" },
    { role: "Admin", username: "fury", password: "123" },
    { role: "Student", username: "iron_man", password: "stark123" },
  ];
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const setCredential = (key: "username" | "password", value: string) => {
    setCredentials({ ...credentials, [key]: value });
  };

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      const courses = await coursesClient.findMyCourses();
      dispatch(setCourses(courses));
      router.push("/dashboard");
    } catch {
      setError("Unable to sign in. Check your username and password.");
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={credentials.username}
        onChange={(event) =>
          setCredential("username", event.currentTarget.value)
        }
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={credentials.password}
        onChange={(event) =>
          setCredential("password", event.currentTarget.value)
        }
      />
      <Button id="wd-signin-btn" className="w-100 mb-2" onClick={signin}>
        Sign in
      </Button>
      {error && <div className="text-danger small mb-2">{error}</div>}
      <div className="border rounded p-3 bg-light mb-2">
        <div className="fw-bold mb-2">Sample test accounts</div>
        {sampleUsers.map((user) => (
          <div key={user.role} className="small">
            {user.role}: {user.username} / {user.password}
          </div>
        ))}
      </div>
      <br />
      <Link id="wd-signup-link" href="/account/signup">
        Sign up
      </Link>
    </div>
  );
}
