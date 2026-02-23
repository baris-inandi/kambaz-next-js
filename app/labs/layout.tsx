import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function LabsLayout(props: Props) {
  return <>{props.children}</>;
}
