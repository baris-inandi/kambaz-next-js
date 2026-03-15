"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function QueryParamsPage() {
  const searchParams = useSearchParams();
  const a = Number(searchParams.get("a") || 0);
  const b = Number(searchParams.get("b") || 0);

  return (
    <div id="wd-query-params" className="container">
      <h2>Query Search Parameters</h2>
      <div className="mb-3">
        <Link
          href="/labs/lab4/url-encoding/query-params?a=12&b=34"
          className="btn btn-primary me-2"
        >
          12 + 34
        </Link>
        <Link
          href="/labs/lab4/url-encoding/query-params?a=56&b=78"
          className="btn btn-secondary"
        >
          56 + 78
        </Link>
      </div>
      <h3>
        {a} + {b} = {a + b}
      </h3>
    </div>
  );
}
