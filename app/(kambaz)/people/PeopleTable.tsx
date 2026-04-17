"use client";

import { useState } from "react";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { User } from "../database";
import PeopleDetails from "./PeopleDetails";

interface Props {
  users?: User[];
  fetchUsers: () => void | Promise<void>;
  canEdit?: boolean;
}

export default function PeopleTable({
  users = [],
  fetchUsers,
  canEdit = false,
}: Props) {
  const [showUserId, setShowUserId] = useState<string | null>(null);

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <button
                  className="btn btn-link p-0 text-decoration-none"
                  onClick={() => setShowUserId(user._id)}
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </button>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PeopleDetails
        uid={showUserId}
        onClose={() => setShowUserId(null)}
        fetchUsers={fetchUsers}
        canEdit={canEdit}
      />
    </div>
  );
}
