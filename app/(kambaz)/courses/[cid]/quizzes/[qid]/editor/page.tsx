import QuizEditorPageClient from "../../../../../quizzes/QuizEditorPageClient";

interface Props {
  params: Promise<{ cid: string; qid: string }>;
}

export default async function QuizEditorPage(props: Props) {
  const { cid, qid } = await props.params;
  return <QuizEditorPageClient cid={cid} qid={qid} />;
}
