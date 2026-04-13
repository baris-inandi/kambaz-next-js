"use client";

import { useEffect, useState } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import { User } from "../database";
import * as accountClient from "../account/client";

interface Props {
  uid: string | null;
  onClose: () => void;
  fetchUsers: () => void | Promise<void>;
  canEdit?: boolean;
}

export default function PeopleDetails({
  uid,
  onClose,
  fetchUsers,
  canEdit = false,
}: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [draft, setDraft] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      if (!uid) {
        setUser(null);
        setDraft(null);
        setEditing(false);
        return;
      }
      const nextUser = await accountClient.findUserById(uid);
      setUser(nextUser);
      setDraft(nextUser);
      setEditing(false);
    };

    void loadUser();
  }, [uid]);

  if (!uid) {
    return null;
  }

  const close = () => {
    setEditing(false);
    onClose();
  };

  const setDraftField = (key: keyof User, value: string) => {
    if (!draft) {
      return;
    }
    setDraft({ ...draft, [key]: value });
  };

  const save = async () => {
    if (!draft) {
      return;
    }
    const updatedUser = await accountClient.updateUser(draft);
    setUser(updatedUser);
    setDraft(updatedUser);
    setEditing(false);
    await fetchUsers();
  };

  const remove = async () => {
    if (!user || !window.confirm("Delete this user?")) {
      return;
    }
    await accountClient.deleteUser(user._id);
    await fetchUsers();
    close();
  };

  const displayUser = draft ?? user;

  return (
    <Modal show={!!uid} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!displayUser ? (
          <div>Loading...</div>
        ) : (
          <div className="d-grid gap-2">
            <label htmlFor="wd-user-first-name">First Name</label>
            <FormControl
              id="wd-user-first-name"
              value={displayUser.firstName}
              readOnly={!editing}
              onChange={(event) =>
                setDraftField("firstName", event.currentTarget.value)
              }
            />

            <label htmlFor="wd-user-last-name">Last Name</label>
            <FormControl
              id="wd-user-last-name"
              value={displayUser.lastName}
              readOnly={!editing}
              onChange={(event) =>
                setDraftField("lastName", event.currentTarget.value)
              }
            />

            <label htmlFor="wd-user-username">Username</label>
            <FormControl
              id="wd-user-username"
              value={displayUser.username}
              readOnly
            />

            <label htmlFor="wd-user-login-id">Login ID</label>
            <FormControl
              id="wd-user-login-id"
              value={displayUser.loginId}
              readOnly
            />

            <label htmlFor="wd-user-email">Email</label>
            <FormControl
              id="wd-user-email"
              value={displayUser.email}
              readOnly
            />

            <label htmlFor="wd-user-role">Role</label>
            <FormControl id="wd-user-role" value={displayUser.role} readOnly />

            <label htmlFor="wd-user-section">Section</label>
            <FormControl
              id="wd-user-section"
              value={displayUser.section}
              readOnly
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Cancel
        </Button>
        {canEdit && !editing && user && (
          <>
            <Button variant="warning" onClick={() => setEditing(true)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => void remove()}>
              Delete
            </Button>
          </>
        )}
        {canEdit && editing && (
          <Button variant="primary" onClick={() => void save()}>
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
