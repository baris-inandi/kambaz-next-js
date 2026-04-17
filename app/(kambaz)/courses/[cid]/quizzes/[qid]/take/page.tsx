import QuizTakePageClient from "../../../../../quizzes/QuizTakePageClient";

interface Props {
  params: Promise<{ cid: string; qid: string }>;
}

export default async function QuizTakePage(props: Props) {
  const { cid, qid } = await props.params;
  return <QuizTakePageClient cid={cid} qid={qid} />;
}
