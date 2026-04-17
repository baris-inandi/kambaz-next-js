"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../hooks";
import PazzaHeader from "./PazzaHeader";
import * as pazzaClient from "./client";
import { PazzaFolder } from "./types";

interface Props {
  cid: string;
}

const isInstructor = (role?: string) => role === "FACULTY" || role === "TA";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  return fallback;
};

export default function ManageFoldersPageClient({ cid }: Props) {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const course = courses.find((item) => item._id === cid);
  const courseLabel = course
    ? `${course.number ? `${course.number} ` : ""}${course.name}`
    : cid;
  const [folders, setFolders] = useState<PazzaFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFolderIds, setSelectedFolderIds] = useState<string[]>([]);
  const [editingFolderId, setEditingFolderId] = useState("");
  const [editingName, setEditingName] = useState("");
  const [error, setError] = useState("");
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [headerStyle, setHeaderStyle] = useState<CSSProperties>();
  const [headerOffset, setHeaderOffset] = useState(0);

  useEffect(() => {
    if (currentUser && !isInstructor(currentUser.role)) {
      router.replace(`/courses/${cid}/pazza`);
    }
  }, [cid, currentUser, router]);

  useEffect(() => {
    const load = async () => {
      if (!currentUser) {
        return;
      }
      setLoading(true);
      try {
        const data = await pazzaClient.findFoldersForCourse(cid);
        setFolders(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [cid, currentUser]);

  useEffect(() => {
    const updateLayout = () => {
      if (!pageRef.current) {
        return;
      }

      const rect = pageRef.current.getBoundingClientRect();
      const top = Math.max(rect.top, 0);
      setHeaderStyle({
        left: rect.left,
        width: rect.width,
        top,
      });
      setHeaderOffset(150);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  if (!currentUser || !isInstructor(currentUser.role)) {
    return null;
  }

  const addFolder = async () => {
    if (!newFolderName.trim()) {
      setError("Folder name is required.");
      return;
    }

    const createdFolder = await pazzaClient.createFolder(
      cid,
      newFolderName.trim(),
    );
    setFolders((current) => [...current, createdFolder]);
    setNewFolderName("");
    setError("");
  };

  const saveFolder = async () => {
    if (!editingFolderId || !editingName.trim()) {
      setError("Folder name is required.");
      return;
    }

    const updatedFolder = await pazzaClient.updateFolder(
      cid,
      editingFolderId,
      editingName.trim(),
    );
    setFolders((current) =>
      current.map((folder) =>
        folder._id === updatedFolder._id ? updatedFolder : folder,
      ),
    );
    setEditingFolderId("");
    setEditingName("");
    setError("");
  };

  const removeSelected = async () => {
    if (!selectedFolderIds.length) {
      return;
    }

    try {
      await pazzaClient.deleteFolders(cid, selectedFolderIds);
      setFolders((current) =>
        current.filter((folder) => !selectedFolderIds.includes(folder._id)),
      );
      setSelectedFolderIds([]);
      setError("");
    } catch (problem: unknown) {
      setError(getErrorMessage(problem, "Unable to delete folders."));
    }
  };

  return (
    <div
      ref={pageRef}
      className="wd-pazza-page"
      style={{ paddingTop: `${headerOffset}px` }}
    >
      <PazzaHeader
        cid={cid}
        courseLabel={courseLabel}
        currentUserName={
          `${currentUser.firstName} ${currentUser.lastName}`.trim() ||
          currentUser.username
        }
        activeTab="manage"
        showManageClass
        fixedStyle={headerStyle}
      />

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="border rounded-4 bg-white p-4 mt-3">
          <div className="border-bottom mb-4">
            <div className="d-flex gap-3">
              <button
                type="button"
                className="btn btn-link text-decoration-none text-dark fw-semibold px-0 border-bottom border-2 border-dark rounded-0"
              >
                Manage Folders
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h2 className="fs-3 mb-1">Manage Class</h2>
              <p className="text-secondary mb-0">
                Configure the folders students and instructors can post into.
              </p>
            </div>
            <Button
              variant="outline-secondary"
              onClick={() => router.push(`/courses/${cid}/pazza`)}
            >
              Back to Q&amp;A
            </Button>
          </div>

          <div className="border rounded-3 p-3 bg-light mb-4">
            <Form.Label className="fw-semibold">Add Folder</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                value={newFolderName}
                onChange={(event) =>
                  setNewFolderName(event.currentTarget.value)
                }
                placeholder="Folder name"
              />
              <Button onClick={addFolder}>Add Folder</Button>
            </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="fw-semibold">Current Folders</div>
            <Button
              variant="outline-danger"
              onClick={removeSelected}
              disabled={!selectedFolderIds.length}
            >
              Delete selected folders
            </Button>
          </div>

          <div className="d-flex flex-column gap-3">
            {folders.map((folder) => (
              <div
                key={folder._id}
                className="border rounded-3 p-3 d-flex flex-wrap justify-content-between align-items-center gap-3"
              >
                <div className="d-flex align-items-center gap-3 flex-grow-1">
                  <Form.Check
                    type="checkbox"
                    checked={selectedFolderIds.includes(folder._id)}
                    onChange={(event) =>
                      setSelectedFolderIds((current) =>
                        event.currentTarget.checked
                          ? [...current, folder._id]
                          : current.filter((item) => item !== folder._id),
                      )
                    }
                  />

                  {editingFolderId === folder._id ? (
                    <Form.Control
                      value={editingName}
                      onChange={(event) =>
                        setEditingName(event.currentTarget.value)
                      }
                    />
                  ) : (
                    <div className="fw-semibold">{folder.name}</div>
                  )}
                </div>

                {editingFolderId === folder._id ? (
                  <div className="d-flex gap-2">
                    <Button size="sm" onClick={saveFolder}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setEditingFolderId("");
                        setEditingName("");
                        setError("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => {
                      setEditingFolderId(folder._id);
                      setEditingName(folder.name);
                    }}
                  >
                    Edit
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
