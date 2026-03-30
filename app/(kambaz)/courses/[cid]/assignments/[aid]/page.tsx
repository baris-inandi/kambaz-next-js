"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Assignment } from "../../../../database";
import AssignmentEditorForm from "../AssignmentEditorForm";
import * as client from "../../../../assignments/client";

export default function AssignmentEditorPage() {
  const params = useParams<{ cid: string; aid: string }>();
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  const aid = Array.isArray(params.aid) ? params.aid[0] : params.aid;
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignment = async () => {
      if (!aid || !cid) {
        setLoading(false);
        return;
      }

      try {
        const nextAssignment = await client.findAssignmentById(aid);
        if (nextAssignment.course === cid) {
          setAssignment(nextAssignment);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [aid, cid]);

  if (loading) {
    return (
      <div id="wd-assignments-editor" className="container">
        <h3>Loading assignment...</h3>
      </div>
    );
  }

  if (!cid || !aid || !assignment) {
    return (
      <div id="wd-assignments-editor" className="container">
        <h3>Assignment not found</h3>
      </div>
    );
  }

  return <AssignmentEditorForm cid={cid} initialAssignment={assignment} />;
}
