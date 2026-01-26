import { ReactNode } from "react";
import KambazNavigation from "./Navigation";

interface Props {
  children: ReactNode;
}

export default function KambazLayout(props: Props) {
  return (
    <table>
      <tbody>
        <tr>
          <td valign="top" width="200">
            <KambazNavigation />
          </td>
          <td valign="top" width="100%">
            {props.children}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
