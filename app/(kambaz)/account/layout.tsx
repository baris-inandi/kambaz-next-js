import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

interface Props {
  children: ReactNode;
}

export default function AccountLayout(props: Props) {
  return (
    <div id="wd-kambaz">
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <AccountNavigation />
            </td>
            <td valign="top" width="100%">
              {props.children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
