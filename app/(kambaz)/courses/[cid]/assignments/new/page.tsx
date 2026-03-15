"use client";

import { useParams } from "next/navigation";
import AssignmentEditorForm from "../AssignmentEditorForm";

export default function NewAssignmentPage() {
  const params = useParams<{ cid: string }>();
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;

  return <AssignmentEditorForm cid={cid} isNew />;
}
