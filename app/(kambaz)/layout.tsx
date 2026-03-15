import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import StoreProvider from "./StoreProvider";
import "./styles.css";

interface Props {
  children: ReactNode;
}

export default function KambazLayout(props: Props) {
  return (
    <StoreProvider>
      <div id="wd-kambaz">
        <div className="d-flex">
          <div>
            <KambazNavigation />
          </div>
          <div className="wd-main-content-offset p-3 flex-fill">
            {props.children}
          </div>
        </div>
      </div>
    </StoreProvider>
  );
}
