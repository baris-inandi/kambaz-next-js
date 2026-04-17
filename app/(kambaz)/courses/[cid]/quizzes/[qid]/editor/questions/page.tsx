import QuizQuestionsEditorPageClient from "../../../../../../quizzes/QuizQuestionsEditorPageClient";

interface Props {
  params: Promise<{ cid: string; qid: string }>;
}

export default async function QuizQuestionsEditorPage(props: Props) {
  const { cid, qid } = await props.params;
  return <QuizQuestionsEditorPageClient cid={cid} qid={qid} />;
}
