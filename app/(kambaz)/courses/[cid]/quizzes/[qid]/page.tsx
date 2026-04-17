import QuizDetailsPageClient from "../../../../quizzes/QuizDetailsPageClient";

interface Props {
  params: Promise<{ cid: string; qid: string }>;
}

export default async function QuizDetailsPage(props: Props) {
  const { cid, qid } = await props.params;
  return <QuizDetailsPageClient cid={cid} qid={qid} />;
}
