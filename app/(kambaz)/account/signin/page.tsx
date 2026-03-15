"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { users } from "../../database";
import { useAppDispatch } from "../../hooks";
import { setCurrentUser } from "../reducer";

export default function Signin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const updateCredentials =
    (key: "username" | "password") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setCredentials({ ...credentials, [key]: event.target.value });
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
        onChange={updateCredentials("username")}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={credentials.password}
        onChange={updateCredentials("password")}
      />
      <Button id="wd-signin-btn" className="w-100 mb-2" onClick={signin}>
        Sign in
      </Button>
      <br />
      <Link id="wd-signup-link" href="/account/signup">
        Sign up
      </Link>
    </div>
  );
}
