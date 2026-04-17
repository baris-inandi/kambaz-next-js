import QuizPreviewPageClient from "../../../../../quizzes/QuizPreviewPageClient";

interface Props {
  params: Promise<{ cid: string; qid: string }>;
}

export default async function QuizPreviewPage(props: Props) {
  const { cid, qid } = await props.params;
  return <QuizPreviewPageClient cid={cid} qid={qid} />;
}
