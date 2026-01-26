import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ cid: string }>;
}

export default async function CoursesPage(props: Props) {
  const { cid } = await props.params;
  redirect(`/courses/${cid}/home`);
}
