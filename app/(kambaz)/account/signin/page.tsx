"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { users } from "../../database";
import { useAppDispatch } from "../../hooks";
import { setCurrentUser } from "../reducer";

export default function Signin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const sampleUsers = [
    { role: "Faculty", username: "jose", password: "123" },
    { role: "Admin", username: "fury", password: "123" },
    { role: "Student", username: "tony", password: "123" },
  ];
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const setCredential = (key: "username" | "password", value: string) => {
    setCredentials({ ...credentials, [key]: value });
  };

  const signin = () => {
    const user = users.find(
      (candidate) =>
        candidate.username === credentials.username &&
        candidate.password === credentials.password,
    );

    if (!user) {
      return;
    }

    dispatch(setCurrentUser(user));
    router.push("/dashboard");
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
