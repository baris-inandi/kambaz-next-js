"use client";

import { useParams } from "next/navigation";
import { useAppSelector } from "../../../../hooks";
import AssignmentEditorForm from "../AssignmentEditorForm";

export default function AssignmentEditorPage() {
  const params = useParams<{ cid: string; aid: string }>();
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  const aid = Array.isArray(params.aid) ? params.aid[0] : params.aid;
  const { assignments } = useAppSelector((state) => state.assignmentsReducer);
  const assignment = assignments.find(
    (item) => item._id === aid && item.course === cid,
  );

  if (!cid || !aid || !assignment) {
    return (
      <div id="wd-assignments-editor" className="container">
        <h3>Assignment not found</h3>
      </div>
    );
  }

  return <AssignmentEditorForm cid={cid} initialAssignment={assignment} />;
}
