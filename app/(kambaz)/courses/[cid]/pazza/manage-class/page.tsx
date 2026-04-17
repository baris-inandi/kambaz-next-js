import ManageFoldersPageClient from "../../../../pazza/ManageFoldersPageClient";

interface Props {
  params: Promise<{ cid: string }>;
}

export default async function ManageClassPage(props: Props) {
  const { cid } = await props.params;
  return <ManageFoldersPageClient cid={cid} />;
}
