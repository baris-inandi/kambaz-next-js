import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

interface Props {
  children: ReactNode;
}

export default function AccountLayout(props: Props) {
  return (
    <div id="wd-account-screen" className="d-flex">
      <div className="me-4">
        <AccountNavigation />
      </div>
      <div className="flex-fill">{props.children}</div>
    </div>
  );
}
