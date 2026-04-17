import QuizListPageClient from "../../../quizzes/QuizListPageClient";

interface Props {
  params: Promise<{ cid: string }>;
}

export default async function QuizzesPage(props: Props) {
  const { cid } = await props.params;
  return <QuizListPageClient cid={cid} />;
}
