import { ReactNode } from "react";
import CourseNavigation from "./Navigation";

interface Props {
  children: ReactNode;
  params: Promise<{ cid: string }>;
}

export default async function CoursesLayout(props: Props) {
  const { cid } = await props.params;
  return (
    <div id="wd-courses">
      <h2>Courses {cid}</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top" width="200">
              <CourseNavigation cid={cid} />
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
