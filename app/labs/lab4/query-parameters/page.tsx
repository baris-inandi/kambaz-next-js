"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormControl } from "react-bootstrap";

export default function UrlEncoding() {
  const [a, setA] = useState("5");
  const [b, setB] = useState("10");
  const router = useRouter();
  const baseUrl = "/labs/lab4/url-encoding";

  const goToQueryVersion = () => {
    const params = new URLSearchParams();
    params.set("a", a);
    params.set("b", b);
    router.push(`${baseUrl}/query-params?${params.toString()}`);
  };

  const goToPathVersion = () => {
    const safeA = encodeURIComponent(a);
    const safeB = encodeURIComponent(b);
    router.push(`${baseUrl}/path-params/${safeA}/${safeB}`);
  };

  return (
    <div style={{ padding: 40, maxWidth: 600 }}>
      <h2>Addition Calculator</h2>
      <p>
        Enter two numbers and navigate using either buttons (programmatic) or
        links (declarative):
      </p>
      <FormControl
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
        className="mb-2"
      />
      <FormControl
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
        className="mb-3"
      />
      <h4>Programmatic navigation (using router.push):</h4>
      <button onClick={goToQueryVersion} className="btn btn-success w-100">
        {a} + {b} -&gt; Query Params (programmatic)
      </button>
      <button onClick={goToPathVersion} className="btn btn-success w-100 mt-2">
        {a} + {b} -&gt; Path Params (programmatic)
      </button>
      <h4 className="mt-3">Declarative navigation (using Link):</h4>
      <Link
        href={`${baseUrl}/query-params?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`}
        className="btn btn-primary w-100"
      >
        {a} + {b} -&gt; Query Params (Link)
      </Link>
      <Link
        href={`${baseUrl}/path-params/${encodeURIComponent(a)}/${encodeURIComponent(b)}`}
        className="btn btn-primary w-100 mt-2"
      >
        {a} + {b} -&gt; Path Params (Link)
      </Link>
    </div>
  );
}
