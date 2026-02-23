import Link from "next/link";
import TOC from "./TOC";

export default function Labs() {
  return (
    <table>
      <tbody>
        <tr>
          <td valign="top" width="200px">
            <TOC />
          </td>
          <td valign="top">
            <div id="wd-labs">
              <h1>Labs</h1>
              <p>Baris Inandioglu</p>
              <p>
                <Link
                  href="https://github.com/baris-inandi/kambaz-next-js"
                  id="wd-github"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repository
                </Link>
              </p>
              <ul>
                <li>
                  <Link href="/labs/lab1" id="wd-lab1-link">
                    Lab 1: HTML Examples
                  </Link>
                </li>
                <li>
                  <Link href="/labs/lab2" id="wd-lab2-link">
                    Lab 2: CSS Basics
                  </Link>
                </li>
                <li>
                  <Link href="/labs/lab3" id="wd-lab3-link">
                    Lab 3: JavaScript Fundamentals
                  </Link>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
