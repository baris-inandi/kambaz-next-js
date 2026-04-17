"use client";

import Link from "next/link";
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Accordion,
  Badge,
  Button,
  Dropdown,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { FaCaretLeft, FaCaretRight, FaMagnifyingGlass } from "react-icons/fa6";
import { User } from "../database";
import { useAppSelector } from "../hooks";
import * as coursesClient from "../courses/client";
import * as pazzaClient from "./client";
import DiscussionThread from "./DiscussionThread";
import PazzaHeader from "./PazzaHeader";
import RichTextEditor from "./RichTextEditor";
import {
  PazzaAnswer,
  PazzaFolder,
  PazzaPost,
  PazzaPostInput,
  PazzaStats,
} from "./types";
import { formatPostTime, groupPostsByDate, stripHtml } from "./utils";

interface Props {
  cid: string;
}

const emptyStats: PazzaStats = {
  unreadCount: 0,
  unansweredCount: 0,
  totalPosts: 0,
  instructorResponses: 0,
  studentResponses: 0,
  studentsEnrolled: 0,
};

const isInstructor = (user: User | null | undefined) =>
  user?.role === "FACULTY" || user?.role === "TA";

const fullName = (user: User | null | undefined) => {
  if (!user) {
    return "";
  }
  return `${user.firstName} ${user.lastName}`.trim() || user.username;
};

const createPostDraft = (folderId?: string): PazzaPostInput => ({
  type: "QUESTION",
  summary: "",
  detailsHtml: "",
  folderIds: folderId ? [folderId] : [],
  audience: "CLASS",
  visibleToUsers: [],
  includeInstructors: false,
});

const answerOwnerCanEdit = (
  answer: PazzaAnswer,
  user: User,
  facultyOnly: boolean,
) => {
  if (isInstructor(user)) {
    return true;
  }
  if (facultyOnly) {
    return false;
  }
  return answer.author === user._id;
};

const userName = (userMap: Map<string, User>, userId: string) =>
  fullName(userMap.get(userId)) || userId;

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

export default function PazzaPageClient({ cid }: Props) {
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const course = courses.find((item) => item._id === cid);
  const courseLabel = course
    ? `${course.number ? `${course.number} ` : ""}${course.name}`
    : cid;

  const [folders, setFolders] = useState<PazzaFolder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [posts, setPosts] = useState<PazzaPost[]>([]);
  const [stats, setStats] = useState<PazzaStats>(emptyStats);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPost, setSelectedPost] = useState<PazzaPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [search, setSearch] = useState("");
  const [composerMode, setComposerMode] = useState<"create" | "edit" | null>(
    null,
  );
  const [editingPostId, setEditingPostId] = useState("");
  const [postDraft, setPostDraft] = useState<PazzaPostInput>(createPostDraft());
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [answerDraft, setAnswerDraft] = useState("");
  const [editingAnswerId, setEditingAnswerId] = useState("");
  const [editingAnswerHtml, setEditingAnswerHtml] = useState("");
  const [followupText, setFollowupText] = useState("");
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [headerStyle, setHeaderStyle] = useState<CSSProperties>();
  const [headerOffset, setHeaderOffset] = useState(0);

  const currentUserIsInstructor = isInstructor(currentUser);

  const userMap = useMemo(
    () => new Map(users.map((user) => [user._id, user])),
    [users],
  );

  const groupedPosts = useMemo(() => groupPostsByDate(posts), [posts]);

  const syncPost = (updatedPost: PazzaPost) => {
    setSelectedPost(updatedPost);
    setPosts((current) => {
      const remaining = current.filter((post) => post._id !== updatedPost._id);
      return [updatedPost, ...remaining].sort(
        (left, right) =>
          new Date(right.createdAt).getTime() -
          new Date(left.createdAt).getTime(),
      );
    });
  };

  const loadStats = useCallback(async () => {
    const data = await pazzaClient.findStatsForCourse(cid);
    setStats(data);
  }, [cid]);

  const loadPosts = useCallback(async () => {
    const data = await pazzaClient.findPostsForCourse(cid, {
      folder: selectedFolderId || undefined,
      search,
    });
    setPosts(data);
    if (selectedPost) {
      const refreshed = data.find((post) => post._id === selectedPost._id);
      if (!refreshed) {
        setSelectedPost(null);
      }
    }
  }, [cid, search, selectedFolderId, selectedPost]);

  useEffect(() => {
    const bootstrap = async () => {
      if (!currentUser) {
        return;
      }

      setLoading(true);
      try {
        const [foldersData, usersData] = await Promise.all([
          pazzaClient.findFoldersForCourse(cid),
          coursesClient.findUsersForCourse(cid),
        ]);
        setFolders(foldersData);
        setUsers(usersData);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [cid, currentUser]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const load = async () => {
      await Promise.all([loadPosts(), loadStats()]);
    };

    load();
  }, [currentUser, loadPosts, loadStats]);

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

  const openComposer = (mode: "create" | "edit", post?: PazzaPost) => {
    setComposerMode(mode);
    setSelectedPost(null);
    setServerError("");
    setFormErrors({});

    if (post) {
      setEditingPostId(post._id);
      setPostDraft({
        type: post.type,
        summary: post.summary,
        detailsHtml: post.detailsHtml,
        folderIds: post.folderIds,
        audience: post.audience,
        visibleToUsers: post.visibleToUsers,
        includeInstructors: post.includeInstructors,
      });
      return;
    }

    setEditingPostId("");
    setPostDraft(createPostDraft(selectedFolderId || folders[0]?._id));
  };

  const validatePostDraft = () => {
    const nextErrors: Record<string, string> = {};

    if (!postDraft.summary.trim()) {
      nextErrors.summary = "Summary is required.";
    } else if (postDraft.summary.trim().length > 100) {
      nextErrors.summary = "Summary must be 100 characters or less.";
    }

    if (!stripHtml(postDraft.detailsHtml).trim()) {
      nextErrors.detailsHtml = "Details are required.";
    }

    if (!postDraft.folderIds.length) {
      nextErrors.folderIds = "Select at least one folder.";
    }

    if (
      postDraft.audience === "INDIVIDUALS" &&
      !postDraft.includeInstructors &&
      !postDraft.visibleToUsers.length
    ) {
      nextErrors.visibleToUsers = "Choose at least one recipient.";
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitPost = async () => {
    if (!validatePostDraft()) {
      return;
    }

    try {
      const savedPost =
        composerMode === "edit"
          ? await pazzaClient.updatePost(cid, editingPostId, postDraft)
          : await pazzaClient.createPost(cid, postDraft);

      syncPost(savedPost);
      setComposerMode(null);
      setEditingPostId("");
      setPostDraft(createPostDraft(selectedFolderId || folders[0]?._id));
      await loadStats();
    } catch (error: unknown) {
      setServerError(getErrorMessage(error, "Unable to save post."));
    }
  };

  const selectPost = async (postId: string) => {
    setComposerMode(null);
    setEditingPostId("");
    const post = await pazzaClient.findPostById(cid, postId);
    syncPost(post);
    await loadStats();
  };

  const removePost = async (postId: string) => {
    await pazzaClient.deletePost(cid, postId);
    setPosts((current) => current.filter((post) => post._id !== postId));
    if (selectedPost?._id === postId) {
      setSelectedPost(null);
    }
    await loadStats();
  };

  const submitAnswer = async () => {
    if (!selectedPost || !stripHtml(answerDraft).trim()) {
      return;
    }

    const updatedPost = await pazzaClient.createAnswer(
      cid,
      selectedPost._id,
      answerDraft,
    );
    syncPost(updatedPost);
    setAnswerDraft("");
    await loadStats();
  };

  const saveEditedAnswer = async () => {
    if (
      !selectedPost ||
      !editingAnswerId ||
      !stripHtml(editingAnswerHtml).trim()
    ) {
      return;
    }

    const updatedPost = await pazzaClient.updateAnswer(
      cid,
      selectedPost._id,
      editingAnswerId,
      editingAnswerHtml,
    );
    syncPost(updatedPost);
    setEditingAnswerId("");
    setEditingAnswerHtml("");
    await loadStats();
  };

  const removeAnswer = async (answerId: string) => {
    if (!selectedPost) {
      return;
    }

    const updatedPost = await pazzaClient.deleteAnswer(
      cid,
      selectedPost._id,
      answerId,
    );
    syncPost(updatedPost);
    await loadStats();
  };

  const submitFollowup = async () => {
    if (!selectedPost || !followupText.trim()) {
      return;
    }

    const updatedPost = await pazzaClient.createFollowup(
      cid,
      selectedPost._id,
      followupText.trim(),
    );
    syncPost(updatedPost);
    setFollowupText("");
    await loadStats();
  };

  const renderAnswerSection = (
    title: string,
    answers: PazzaAnswer[],
    facultyOnly: boolean,
  ) => {
    if (!currentUser || !selectedPost) {
      return null;
    }

    const showComposer =
      (facultyOnly ? currentUserIsInstructor : !currentUserIsInstructor) &&
      answers.length === 0;

    return (
      <div className="mt-4">
        <h4 className="fs-5 mb-3">{title}</h4>
        {answers.length === 0 && (
          <p className="text-secondary small mb-3">No answers yet.</p>
        )}

        {answers.map((answer) => {
          const canEdit = answerOwnerCanEdit(answer, currentUser, facultyOnly);
          return (
            <div
              key={answer._id}
              className="border rounded-3 p-3 mb-3 bg-white"
            >
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <div className="fw-semibold">
                    {userName(userMap, answer.author)}
                  </div>
                  <div className="text-secondary small">
                    {formatPostTime(answer.createdAt)}
                  </div>
                </div>
                {canEdit && (
                  <div className="d-flex align-items-center gap-2">
                    <Button
                      size="sm"
                      variant="link"
                      className="text-decoration-none p-0"
                      onClick={() => {
                        setEditingAnswerId(answer._id);
                        setEditingAnswerHtml(answer.bodyHtml);
                      }}
                    >
                      Edit
                    </Button>
                    <Dropdown align="end">
                      <Dropdown.Toggle size="sm" variant="light">
                        Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            setEditingAnswerId(answer._id);
                            setEditingAnswerHtml(answer.bodyHtml);
                          }}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => removeAnswer(answer._id)}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}
              </div>

              {editingAnswerId === answer._id ? (
                <div className="mt-3">
                  <RichTextEditor
                    value={editingAnswerHtml}
                    onChange={setEditingAnswerHtml}
                    placeholder="Edit answer"
                  />
                  <div className="d-flex gap-2 mt-3">
                    <Button size="sm" onClick={saveEditedAnswer}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setEditingAnswerId("");
                        setEditingAnswerHtml("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="mt-3"
                  dangerouslySetInnerHTML={{ __html: answer.bodyHtml }}
                />
              )}
            </div>
          );
        })}

        {showComposer && (
          <div className="border rounded-3 p-3 bg-light">
            <RichTextEditor
              value={answerDraft}
              onChange={setAnswerDraft}
              placeholder="Write your answer"
            />
            <div className="d-flex gap-2 mt-3">
              <Button size="sm" onClick={submitAnswer}>
                Post Answer
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setAnswerDraft("")}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div
      ref={pageRef}
      className="wd-pazza-page"
      style={{ paddingTop: `${headerOffset}px` }}
    >
      <PazzaHeader
        cid={cid}
        courseLabel={courseLabel}
        currentUserName={fullName(currentUser)}
        activeTab="qa"
        showManageClass={currentUserIsInstructor}
        fixedStyle={headerStyle}
      >
        <div className="wd-pazza-folders border border-top-0 rounded-bottom-4">
          <Button
            size="sm"
            variant={selectedFolderId ? "outline-secondary" : "dark"}
            onClick={() => setSelectedFolderId("")}
          >
            All Posts
          </Button>
          {folders.map((folder) => (
            <Button
              key={folder._id}
              size="sm"
              variant={
                selectedFolderId === folder._id ? "dark" : "outline-secondary"
              }
              onClick={() => setSelectedFolderId(folder._id)}
            >
              {folder.name}
            </Button>
          ))}
        </div>
      </PazzaHeader>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="row g-3 mt-2">
          {!sidebarHidden && (
            <div className="col-12 col-xl-4">
              <div className="border rounded-4 bg-white p-3 h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Button
                    variant="link"
                    className="text-dark p-0 text-decoration-none"
                    onClick={() => setSidebarHidden(true)}
                  >
                    <FaCaretLeft className="me-1" />
                    Unread
                  </Button>
                </div>

                <div className="d-flex gap-2 mb-3">
                  <Button
                    variant="danger"
                    onClick={() => openComposer("create")}
                  >
                    New Post
                  </Button>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaMagnifyingGlass />
                    </InputGroup.Text>
                    <Form.Control
                      value={search}
                      onChange={(event) => setSearch(event.currentTarget.value)}
                      placeholder="Search posts"
                    />
                  </InputGroup>
                </div>

                <Accordion
                  alwaysOpen
                  defaultActiveKey={groupedPosts.map(([key]) => key)}
                >
                  {groupedPosts.map(([group, items]) => (
                    <Accordion.Item eventKey={group} key={group}>
                      <Accordion.Header>{group}</Accordion.Header>
                      <Accordion.Body className="px-0 py-2">
                        <div className="d-flex flex-column gap-2">
                          {items.map((post) => (
                            <button
                              key={post._id}
                              type="button"
                              className={`btn text-start border rounded-3 p-3 ${
                                selectedPost?._id === post._id
                                  ? "border-danger bg-danger-subtle"
                                  : "bg-white"
                              }`}
                              onClick={() => selectPost(post._id)}
                            >
                              <div className="fw-semibold mb-1">
                                {post.summary}
                              </div>
                              <div className="small text-secondary mb-1">
                                {isInstructor(userMap.get(post.author))
                                  ? "Instructor"
                                  : "Student"}
                              </div>
                              <div className="small text-secondary wd-pazza-clamp">
                                {stripHtml(post.detailsHtml)}
                              </div>
                              <div className="small text-secondary mt-2">
                                {formatPostTime(post.createdAt)}
                              </div>
                            </button>
                          ))}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>
          )}

          <div className={sidebarHidden ? "col-12" : "col-12 col-xl-8"}>
            <div className="border rounded-4 bg-white p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Button
                  variant="link"
                  className="text-dark p-0 text-decoration-none"
                  onClick={() => setSidebarHidden((current) => !current)}
                >
                  {sidebarHidden ? <FaCaretRight /> : <FaCaretLeft />} Posts
                </Button>
              </div>

              {composerMode ? (
                <div>
                  <div className="d-flex gap-2 mb-3">
                    <Button
                      variant={
                        postDraft.type === "QUESTION"
                          ? "dark"
                          : "outline-secondary"
                      }
                      onClick={() =>
                        setPostDraft((current) => ({
                          ...current,
                          type: "QUESTION",
                        }))
                      }
                    >
                      Question
                    </Button>
                    <Button
                      variant={
                        postDraft.type === "NOTE" ? "dark" : "outline-secondary"
                      }
                      onClick={() =>
                        setPostDraft((current) => ({
                          ...current,
                          type: "NOTE",
                        }))
                      }
                    >
                      Note
                    </Button>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Post To</Form.Label>
                    <div className="d-flex flex-column gap-2">
                      <Form.Check
                        type="radio"
                        name="audience"
                        label="Entire Class"
                        checked={postDraft.audience === "CLASS"}
                        onChange={() =>
                          setPostDraft((current) => ({
                            ...current,
                            audience: "CLASS",
                            visibleToUsers: [],
                            includeInstructors: false,
                          }))
                        }
                      />
                      <Form.Check
                        type="radio"
                        name="audience"
                        label="Individual Students/Instructors"
                        checked={postDraft.audience === "INDIVIDUALS"}
                        onChange={() =>
                          setPostDraft((current) => ({
                            ...current,
                            audience: "INDIVIDUALS",
                          }))
                        }
                      />
                    </div>
                  </Form.Group>

                  {postDraft.audience === "INDIVIDUALS" && (
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Recipients
                      </Form.Label>
                      <div className="border rounded-3 p-3 bg-light">
                        <Form.Check
                          type="checkbox"
                          label="Instructors"
                          checked={postDraft.includeInstructors}
                          onChange={(event) =>
                            setPostDraft((current) => ({
                              ...current,
                              includeInstructors: event.currentTarget.checked,
                            }))
                          }
                          className="mb-2"
                        />
                        <div className="row row-cols-1 row-cols-md-2 g-2">
                          {users.map((user) => (
                            <div key={user._id} className="col">
                              <Form.Check
                                type="checkbox"
                                label={`${fullName(user)} (${user.role})`}
                                checked={postDraft.visibleToUsers.includes(
                                  user._id,
                                )}
                                onChange={(event) =>
                                  setPostDraft((current) => ({
                                    ...current,
                                    visibleToUsers: event.currentTarget.checked
                                      ? [...current.visibleToUsers, user._id]
                                      : current.visibleToUsers.filter(
                                          (item) => item !== user._id,
                                        ),
                                  }))
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      {formErrors.visibleToUsers && (
                        <div className="text-danger small mt-2">
                          {formErrors.visibleToUsers}
                        </div>
                      )}
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Form.Label className="fw-semibold mb-0">
                        Select Folders
                      </Form.Label>
                      {currentUserIsInstructor && (
                        <Link href={`/courses/${cid}/pazza/manage-class`}>
                          Manage and reorder folders
                        </Link>
                      )}
                    </div>
                    <div className="row row-cols-2 row-cols-md-3 g-2">
                      {folders.map((folder) => (
                        <div key={folder._id} className="col">
                          <Form.Check
                            type="checkbox"
                            label={folder.name}
                            checked={postDraft.folderIds.includes(folder._id)}
                            onChange={(event) =>
                              setPostDraft((current) => ({
                                ...current,
                                folderIds: event.currentTarget.checked
                                  ? [...current.folderIds, folder._id]
                                  : current.folderIds.filter(
                                      (item) => item !== folder._id,
                                    ),
                              }))
                            }
                          />
                        </div>
                      ))}
                    </div>
                    {formErrors.folderIds && (
                      <div className="text-danger small mt-2">
                        {formErrors.folderIds}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Summary</Form.Label>
                    <Form.Control
                      maxLength={100}
                      value={postDraft.summary}
                      onChange={(event) =>
                        setPostDraft((current) => ({
                          ...current,
                          summary: event.currentTarget.value,
                        }))
                      }
                      placeholder="Short summary for this post"
                    />
                    <div className="small text-secondary mt-1">
                      {postDraft.summary.length}/100
                    </div>
                    {formErrors.summary && (
                      <div className="text-danger small mt-1">
                        {formErrors.summary}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Details</Form.Label>
                    <RichTextEditor
                      value={postDraft.detailsHtml}
                      onChange={(value) =>
                        setPostDraft((current) => ({
                          ...current,
                          detailsHtml: value,
                        }))
                      }
                      placeholder="Explain your question or note"
                    />
                    {formErrors.detailsHtml && (
                      <div className="text-danger small mt-2">
                        {formErrors.detailsHtml}
                      </div>
                    )}
                  </Form.Group>

                  {serverError && (
                    <div className="alert alert-danger">{serverError}</div>
                  )}

                  <div className="d-flex gap-2">
                    <Button onClick={submitPost}>
                      {composerMode === "edit"
                        ? "Save Changes"
                        : postDraft.type === "QUESTION"
                          ? "Post My Question"
                          : "Post My Note"}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setComposerMode(null);
                        setEditingPostId("");
                        setPostDraft(
                          createPostDraft(selectedFolderId || folders[0]?._id),
                        );
                        setFormErrors({});
                        setServerError("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : selectedPost ? (
                <div>
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <h2 className="fs-3 mb-2">{selectedPost.summary}</h2>
                      <div className="d-flex flex-wrap gap-2 mb-2">
                        <Badge bg="light" text="dark">
                          {selectedPost.viewedBy.length} views
                        </Badge>
                        {selectedPost.folderIds.map((folderId) => (
                          <Badge key={folderId} bg="secondary">
                            {folders.find((folder) => folder._id === folderId)
                              ?.name ?? folderId}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-secondary small">
                        {userName(userMap, selectedPost.author)} •{" "}
                        {formatPostTime(selectedPost.createdAt)}
                      </div>
                    </div>

                    {(currentUserIsInstructor ||
                      selectedPost.author === currentUser._id) && (
                      <div className="d-flex align-items-center gap-2">
                        <Button
                          size="sm"
                          variant="link"
                          className="text-decoration-none p-0"
                          onClick={() => openComposer("edit", selectedPost)}
                        >
                          Edit
                        </Button>
                        <Dropdown align="end">
                          <Dropdown.Toggle size="sm" variant="light">
                            Actions
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => openComposer("edit", selectedPost)}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => removePost(selectedPost._id)}
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    )}
                  </div>

                  <div
                    className="mt-4"
                    dangerouslySetInnerHTML={{
                      __html: selectedPost.detailsHtml,
                    }}
                  />

                  {selectedPost.type === "QUESTION" && (
                    <>
                      {renderAnswerSection(
                        "Student Answers",
                        selectedPost.studentAnswers,
                        false,
                      )}
                      {renderAnswerSection(
                        "Instructor Answers",
                        selectedPost.instructorAnswers,
                        true,
                      )}
                    </>
                  )}

                  <div className="mt-4">
                    <h4 className="fs-5 mb-3">Follow Up Discussion</h4>
                    <Form.Group>
                      <Form.Label>Start a new followup discussion</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={followupText}
                        onChange={(event) =>
                          setFollowupText(event.currentTarget.value)
                        }
                      />
                    </Form.Group>
                    <div className="d-flex gap-2 mt-2">
                      <Button size="sm" onClick={submitFollowup}>
                        Post Discussion
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setFollowupText("")}
                      >
                        Cancel
                      </Button>
                    </div>

                    {selectedPost.followups.length === 0 ? (
                      <p className="text-secondary small mt-3 mb-0">
                        No followup discussions yet.
                      </p>
                    ) : (
                      <DiscussionThread
                        cid={cid}
                        postId={selectedPost._id}
                        nodes={selectedPost.followups}
                        currentUser={currentUser}
                        userMap={userMap}
                        isTopLevel
                        onPostUpdated={async (post) => {
                          syncPost(post);
                          await loadStats();
                        }}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="border rounded-3 p-3 bg-light h-100">
                      <div className="text-secondary small">Unread posts</div>
                      <div className="display-6 fw-semibold">
                        {stats.unreadCount || "0"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="border rounded-3 p-3 bg-light h-100">
                      <div className="text-secondary small">
                        Unanswered posts
                      </div>
                      <div className="display-6 fw-semibold">
                        {stats.unansweredCount || "0"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="border rounded-3 p-3 bg-light h-100">
                      <div className="text-secondary small">Total posts</div>
                      <div className="display-6 fw-semibold">
                        {stats.totalPosts}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="border rounded-3 p-3 bg-light h-100">
                      <div className="text-secondary small">
                        Instructor responses
                      </div>
                      <div className="display-6 fw-semibold">
                        {stats.instructorResponses}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="border rounded-3 p-3 bg-light h-100">
                      <div className="text-secondary small">
                        Student responses
                      </div>
                      <div className="display-6 fw-semibold">
                        {stats.studentResponses}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="border rounded-3 p-3 bg-light h-100">
                      <div className="text-secondary small">
                        Students enrolled
                      </div>
                      <div className="display-6 fw-semibold">
                        {stats.studentsEnrolled}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
