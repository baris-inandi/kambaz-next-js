import PazzaPageClient from "../../../pazza/PazzaPageClient";

interface Props {
  params: Promise<{ cid: string }>;
}

export default async function PazzaPage(props: Props) {
  const { cid } = await props.params;
  return <PazzaPageClient cid={cid} />;
}
