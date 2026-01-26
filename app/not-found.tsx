import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>
        The requested page could not be found. Please check the page URL or
        return to the dashboard.
      </p>
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  );
}
