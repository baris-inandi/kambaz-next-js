"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { User } from "../../database";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCurrentUser } from "../reducer";

export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [profile, setProfile] = useState<User | null>(currentUser);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
    }
  }, [currentUser, router]);

  if (!currentUser || !profile) {
    return null;
  }

  const updateField =
    (key: keyof User) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setProfile({ ...profile, [key]: event.target.value } as User);
    };

  const signout = () => {
    dispatch(setCurrentUser(null));
    router.push("/account/signin");
  };

  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <FormControl
        value={profile.username}
        placeholder="username"
        className="mb-2"
        id="wd-username"
        onChange={updateField("username")}
      />
      <FormControl
        value={profile.password}
        placeholder="password"
        type="password"
        className="mb-2"
        id="wd-password"
        onChange={updateField("password")}
      />
      <FormControl
        value={profile.firstName}
        placeholder="First Name"
        className="mb-2"
        id="wd-firstname"
        onChange={updateField("firstName")}
      />
      <FormControl
        value={profile.lastName}
        placeholder="Last Name"
        className="mb-2"
        id="wd-lastname"
        onChange={updateField("lastName")}
      />
      <FormControl
        value={profile.dob}
        type="date"
        className="mb-2"
        id="wd-dob"
        onChange={updateField("dob")}
      />
      <FormControl
        value={profile.email}
        type="email"
        className="mb-2"
        id="wd-email"
        onChange={updateField("email")}
      />
      <FormSelect
        value={profile.role}
        className="mb-2"
        id="wd-role"
        onChange={updateField("role")}
      >
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
        <option value="TA">TA</option>
      </FormSelect>
      <Button variant="danger" className="w-100 mb-2" type="button">
        Update
      </Button>
      <Button variant="secondary" className="w-100" onClick={signout}>
        Sign out
      </Button>
    </div>
  );
}
