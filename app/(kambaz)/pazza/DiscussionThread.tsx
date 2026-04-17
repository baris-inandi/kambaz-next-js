"use client";

import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { User } from "../database";
import * as pazzaClient from "./client";
import { PazzaFollowup, PazzaPost, PazzaReply } from "./types";
import { formatPostTime } from "./utils";

type Node = PazzaFollowup | PazzaReply;

interface Props {
  cid: string;
  postId: string;
  nodes: Node[];
  currentUser: User;
  userMap: Map<string, User>;
  isTopLevel?: boolean;
  onPostUpdated: (post: PazzaPost) => void;
  depth?: number;
}

const getName = (userMap: Map<string, User>, userId: string) => {
  const user = userMap.get(userId);
  if (!user) {
    return userId;
  }
  return `${user.firstName} ${user.lastName}`.trim() || user.username;
};

const canManageNode = (currentUser: User, authorId: string) =>
  currentUser.role === "FACULTY" ||
  currentUser.role === "TA" ||
  currentUser._id === authorId;

export default function DiscussionThread({
  cid,
  postId,
  nodes,
  currentUser,
  userMap,
  isTopLevel = false,
  onPostUpdated,
  depth = 0,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftText, setDraftText] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [error, setError] = useState("");

  const startEditing = (node: Node) => {
    setEditingId(node._id);
    setDraftText(node.text);
    setReplyingToId(null);
    setError("");
  };

  const saveEdit = async (node: Node) => {
    if (!draftText.trim()) {
      setError("Text is required.");
      return;
    }

    const updatedPost = isTopLevel
      ? await pazzaClient.updateFollowup(cid, postId, node._id, {
          text: draftText.trim(),
        })
      : await pazzaClient.updateReply(cid, postId, node._id, draftText.trim());
    onPostUpdated(updatedPost);
    setEditingId(null);
    setDraftText("");
    setError("");
  };

  const removeNode = async (node: Node) => {
    const updatedPost = isTopLevel
      ? await pazzaClient.deleteFollowup(cid, postId, node._id)
      : await pazzaClient.deleteReply(cid, postId, node._id);
    onPostUpdated(updatedPost);
  };

  const saveReply = async (node: Node) => {
    if (!replyText.trim()) {
      setError("Reply text is required.");
      return;
    }

    const updatedPost = await pazzaClient.createReply(
      cid,
      postId,
      node._id,
      replyText.trim(),
    );
    onPostUpdated(updatedPost);
    setReplyingToId(null);
    setReplyText("");
    setError("");
  };

  const toggleResolved = async (node: Node) => {
    if (!isTopLevel || !("resolved" in node)) {
      return;
    }

    const updatedPost = await pazzaClient.updateFollowup(
      cid,
      postId,
      node._id,
      {
        resolved: !node.resolved,
      },
    );
    onPostUpdated(updatedPost);
  };

  return (
    <div className={depth ? "ms-3 mt-3" : "mt-3"}>
      {nodes.map((node) => {
        const editable = canManageNode(currentUser, node.author);

        return (
          <div key={node._id} className="border rounded-3 p-3 mb-3 bg-white">
            <div className="d-flex justify-content-between align-items-start gap-3">
              <div>
                <div className="fw-semibold">
                  {getName(userMap, node.author)}
                </div>
                <div className="text-secondary small">
                  {formatPostTime(node.createdAt)}
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                {isTopLevel && "resolved" in node && (
                  <Button
                    size="sm"
                    variant={node.resolved ? "success" : "outline-secondary"}
                    onClick={() => toggleResolved(node)}
                  >
                    {node.resolved ? "Resolved" : "Unresolved"}
                  </Button>
                )}

                {editable && (
                  <>
                    <Button
                      size="sm"
                      variant="link"
                      className="text-decoration-none p-0"
                      onClick={() => startEditing(node)}
                    >
                      Edit
                    </Button>
                    <Dropdown align="end">
                      <Dropdown.Toggle size="sm" variant="light">
                        Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => startEditing(node)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => removeNode(node)}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
              </div>
            </div>

            {editingId === node._id ? (
              <div className="mt-3">
                <textarea
                  className="form-control mb-2"
                  rows={3}
                  value={draftText}
                  onChange={(event) => setDraftText(event.currentTarget.value)}
                />
                {error && <div className="text-danger small mb-2">{error}</div>}
                <div className="d-flex gap-2">
                  <Button size="sm" onClick={() => saveEdit(node)}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setEditingId(null);
                      setDraftText("");
                      setError("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="mb-0 mt-3">{node.text}</p>
            )}

            <div className="mt-3">
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() =>
                  setReplyingToId((current) =>
                    current === node._id ? null : node._id,
                  )
                }
              >
                Reply
              </Button>
            </div>

            {replyingToId === node._id && (
              <div className="mt-3">
                <textarea
                  className="form-control mb-2"
                  rows={3}
                  value={replyText}
                  onChange={(event) => setReplyText(event.currentTarget.value)}
                  placeholder="Write a reply"
                />
                {error && <div className="text-danger small mb-2">{error}</div>}
                <div className="d-flex gap-2">
                  <Button size="sm" onClick={() => saveReply(node)}>
                    Post Reply
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setReplyingToId(null);
                      setReplyText("");
                      setError("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {(node.replies?.length ?? 0) > 0 && (
              <DiscussionThread
                cid={cid}
                postId={postId}
                nodes={node.replies}
                currentUser={currentUser}
                userMap={userMap}
                onPostUpdated={onPostUpdated}
                depth={depth + 1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
