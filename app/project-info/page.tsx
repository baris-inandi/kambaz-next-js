import Link from "next/link";

const teamMembers = [
  {
    name: "Baris Inandioglu",
    section: "02",
  },
];

const repositories = [
  {
    label: "Frontend Repository",
    href: "https://github.com/baris-inandi/kambaz-next-js",
  },
  {
    label: "Server Repository",
    href: "https://github.com/baris-inandi/kambaz-node-server-app",
  },
];

export default function ProjectInfoPage() {
  return (
    <main className="min-vh-100 bg-white text-dark">
      <section className="container py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9 col-xl-8">
            <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
              <div>
                <p className="text-uppercase text-danger fw-semibold small mb-1">
                  Project Information
                </p>
                <h1 className="fw-bold mb-0" style={{ fontSize: "2.75rem" }}>
                  Kambaz Quizzes
                </h1>
              </div>
              <Link href="/" className="btn btn-outline-dark px-3 py-2">
                Back to Landing Page
              </Link>
            </div>

            <div className="rounded-4 border shadow-sm overflow-hidden">
              <div className="p-3 p-md-4 border-bottom bg-light">
                <h2 className="h4 mb-1">Team Members</h2>
                <p className="text-secondary mb-0">
                  Full names and sections for the project team.
                </p>
              </div>
              <div className="p-3 p-md-4">
                <div className="row g-2">
                  {teamMembers.map((member) => (
                    <div key={member.name} className="col-md-6">
                      <div className="rounded-3 border h-100 p-3">
                        <div className="fw-semibold">{member.name}</div>
                        <div className="text-secondary">{member.section}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-4 border shadow-sm overflow-hidden mt-4">
              <div className="p-3 p-md-4 border-bottom bg-light">
                <h2 className="h4 mb-1">Repositories</h2>
                <p className="text-secondary mb-0">
                  These links point to the frontend and server codebases for the
                  project.
                </p>
              </div>
              <div className="list-group list-group-flush">
                {repositories.map((repository) => (
                  <a
                    key={repository.href}
                    href={repository.href}
                    target="_blank"
                    rel="noreferrer"
                    className="list-group-item list-group-item-action px-3 px-md-4 py-3"
                  >
                    <div className="fw-semibold">{repository.label}</div>
                    <div className="text-secondary">{repository.href}</div>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <Link href="/account/signin" className="btn btn-danger px-3 py-2">
                Continue to Kambaz Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
