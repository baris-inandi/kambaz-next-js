"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function PathParamsPage() {
  const { a, b } = useParams<{ a: string; b: string }>();
  const left = Number(a);
  const right = Number(b);

  return (
    <div id="wd-path-params" className="container">
      <h2>Path Parameters</h2>
      <div className="mb-3">
        <Link
          href="/labs/lab4/url-encoding/path-params/3/4"
          className="btn btn-primary me-2"
        >
          3 + 4
        </Link>
        <Link
          href="/labs/lab4/url-encoding/path-params/8/9"
          className="btn btn-secondary"
        >
          8 + 9
        </Link>
      </div>
      <h3>
        {left} + {right} = {left + right}
      </h3>
    </div>
  );
}
