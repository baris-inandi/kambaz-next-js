"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { User } from "../../database";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCurrentUser } from "../reducer";
import { setCourses } from "../../courses/reducer";
import * as client from "../client";

export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [profile, setProfile] = useState<User | null>(currentUser);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
    }
  }, [currentUser, router]);

  useEffect(() => {
    setProfile(currentUser);
  }, [currentUser]);

  if (!currentUser || !profile) {
    return null;
  }

  const setProfileField = (key: keyof User, value: string) => {
    setProfile({ ...profile, [key]: value } as User);
  };

  const updateProfile = async () => {
    if (!profile) {
      return;
    }
    const updatedUser = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedUser));
    setMessage("Profile updated.");
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    dispatch(setCourses([]));
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
        onChange={(event) =>
          setProfileField("username", event.currentTarget.value)
        }
      />
      <FormControl
        value={profile.password}
        placeholder="password"
        type="password"
        className="mb-2"
        id="wd-password"
        onChange={(event) =>
          setProfileField("password", event.currentTarget.value)
        }
      />
      <FormControl
        value={profile.firstName}
        placeholder="First Name"
        className="mb-2"
        id="wd-firstname"
        onChange={(event) =>
          setProfileField("firstName", event.currentTarget.value)
        }
      />
      <FormControl
        value={profile.lastName}
        placeholder="Last Name"
        className="mb-2"
        id="wd-lastname"
        onChange={(event) =>
          setProfileField("lastName", event.currentTarget.value)
        }
      />
      <FormControl
        value={profile.dob}
        type="date"
        className="mb-2"
        id="wd-dob"
        onChange={(event) => setProfileField("dob", event.currentTarget.value)}
      />
      <FormControl
        value={profile.email}
        type="email"
        className="mb-2"
        id="wd-email"
        onChange={(event) =>
          setProfileField("email", event.currentTarget.value)
        }
      />
      <FormSelect
        value={profile.role}
        className="mb-2"
        id="wd-role"
        onChange={(event) => setProfileField("role", event.currentTarget.value)}
      >
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
        <option value="TA">TA</option>
      </FormSelect>
      {message && <div className="text-success small mb-2">{message}</div>}
      <Button
        variant="danger"
        className="w-100 mb-2"
        type="button"
        onClick={updateProfile}
      >
        Update
      </Button>
      <Button variant="secondary" className="w-100" onClick={signout}>
        Sign out
      </Button>
    </div>
  );
}
