import QuizResultsPageClient from "../../../../../quizzes/QuizResultsPageClient";

interface Props {
  params: Promise<{ cid: string; qid: string }>;
}

export default async function QuizResultsPage(props: Props) {
  const { cid, qid } = await props.params;
  return <QuizResultsPageClient cid={cid} qid={qid} />;
}
