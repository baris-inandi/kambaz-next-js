import { ReactNode } from "react";
import TOC from "./TOC";

interface Props {
  children: ReactNode;
}

export default function LabsLayout(props: Props) {
  return (
    <table>
      <tbody>
        <tr>
          <td valign="top" width="100px">
            <TOC />
          </td>
          <td valign="top">{props.children}</td>
        </tr>
      </tbody>
    </table>
  );
}
